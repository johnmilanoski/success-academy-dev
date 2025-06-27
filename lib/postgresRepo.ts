/**
 * Postgres Repo implementation.
 * Requires DATABASE_URL to be set in the environment.
 */

import { Pool } from "pg";
import type { Repo } from "./types";
import type { Course, Instructor, Purchase } from "./models";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const pgRepo: Repo = {
  /* -------- Course -------- */
  async getCourses() {
    const { rows } = await pool.query<Course>("SELECT * FROM courses");
    return rows;
  },

  async getCourseById(id) {
    const { rows } = await pool.query<Course>(
      "SELECT * FROM courses WHERE id = $1",
      [id]
    );
    return rows[0] ?? null;
  },

  // ---------- single-object signature ----------
  async createCourse(
    data: Omit<Course, "id" | "created_at" | "published_at">
  ): Promise<Course> {
    const {
      instructor_id,
      title,
      description,
      category,
      price,
      visibility,
      published,
    } = data;

    const { rows } = await pool.query<Course>(
      `INSERT INTO courses
         (instructor_id, title, description, category, price,
          visibility, published, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,NOW())
       RETURNING *`,
      [
        instructor_id,
        title,
        description,
        category,
        price,
        visibility,
        published,
      ]
    );
    return rows[0];
  },

  async listInstructorCourses(instructorId) {
    const { rows } = await pool.query<Course>(
      "SELECT * FROM courses WHERE instructor_id = $1",
      [instructorId]
    );
    return rows;
  },

  async publishCourse(id) {
    await pool.query(
      "UPDATE courses SET published_at = NOW() WHERE id = $1",
      [id]
    );
  },

  async catalog() {
    const { rows } = await pool.query<Course>(
      "SELECT id, title, price, category, instructor_id FROM courses WHERE published_at IS NOT NULL"
    );
    return rows;
  },

  async getTopCourses() {
    const { rows } = await pool.query<Course>(
      "SELECT id, title, price, category, instructor_id FROM courses WHERE published_at IS NOT NULL LIMIT 4"
    );
    return rows;
  },

  /* ------ Purchases ------ */
  async recordPurchase(studentId, courseId, amount) {
    const { rows } = await pool.query<{ id: number }>(
      `INSERT INTO purchases (student_id, course_id, amount)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [studentId, courseId, amount]
    );
    const purchaseId = rows[0].id;

    const { rows: cRows } = await pool.query<{ instructor_id: number }>(
      'SELECT instructor_id FROM courses WHERE id = $1',
      [courseId]
    );
    const instructorId = cRows[0]?.instructor_id;
    if (instructorId) {
      await pool.query('SELECT distribute_commission($1,$2,$3,$4)', [
        purchaseId,
        courseId,
        amount,
        instructorId,
      ]);
    }

    return purchaseId;
  },

  async instructorEarnings(instructorId) {
    const { rows } = await pool.query<{ total: string }>(
      `SELECT COALESCE(SUM(p.amount * 0.5), 0) AS total
       FROM purchases p
       JOIN courses   c ON c.id = p.course_id
       WHERE c.instructor_id = $1`,
      [instructorId]
    );
    return Number(rows[0].total);
  },

  /* ------ Instructor ------ */
  async findInstructorByEmail(email) {
    const { rows } = await pool.query<Instructor>(
      "SELECT * FROM instructors WHERE email = $1",
      [email]
    );
    return rows[0] ?? null;
  },

  async createInstructor(name, email, password_hash) {
    const { rows } = await pool.query<Instructor>(
      `INSERT INTO instructors
         (name, email, password_hash, created_at)
       VALUES ($1,$2,$3,NOW())
       RETURNING *`,
      [name, email, password_hash]
    );
    return rows[0];
  }
};

export default pgRepo;
