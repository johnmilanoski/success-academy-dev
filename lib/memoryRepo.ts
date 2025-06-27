/**
 * In-memory Repo implementation (for local dev / tests).
 */

import type { Repo } from "./types";
import type { Course, Instructor, Purchase } from "./models";

let nextCourseId = 1;
let nextInstructorId = 1;

const courses: Course[] = [];
const instructors: Instructor[] = [];
const purchases: Purchase[] = [];

const nowISO = () => new Date().toISOString();

const memoryRepo: Repo = {
  /* -------- Course -------- */
  async getCourses() {
    return courses;
  },
  async getCourseById(id) {
    return courses.find(c => c.id === id) ?? null;
  },
  async createCourse(data) {
    const course: Course = {
      ...data,
      id: nextCourseId++,
      created_at: nowISO(),
      published_at: null
    };
    courses.push(course);
    return course;
  },
  async listInstructorCourses(instructorId) {
    return courses.filter(c => c.instructor_id === instructorId);
  },
  async publishCourse(id) {
    const c = courses.find(c => c.id === id);
    if (c && !c.published_at) c.published_at = nowISO();
  },
  async catalog() {
    return courses.filter(c => c.published_at !== null);
  },
  async getTopCourses() {
    return courses.filter(c => c.published_at !== null).slice(0, 4);
  },

  /* ------ Purchases ------ */
  async recordPurchase(studentId, courseId, amount) {
    const id = purchases.length + 1;
    purchases.push({
      id,
      student_id: studentId,
      course_id: courseId,
      amount,
      created_at: nowISO(),
    });
    return id;
  },

  async instructorEarnings(instructorId) {
    const courseIds = courses
      .filter(c => c.instructor_id === instructorId)
      .map(c => c.id);

    return purchases
      .filter(p => courseIds.includes(p.course_id))
      .reduce((sum, p) => sum + p.amount * 0.5, 0);   // 50 % share
  },

  /* ------ Instructor ------ */
  async findInstructorByEmail(email) {
    return instructors.find(i => i.email === email) ?? null;
  },
  async createInstructor(name, email, password_hash) {
    const inst: Instructor = {
      id: nextInstructorId++,
      name,
      email,
      password_hash,
      created_at: nowISO()
    };
    instructors.push(inst);
    return inst;
  }
};

export default memoryRepo;
