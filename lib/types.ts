/**
 * Central Repo interface — every persistence layer must satisfy this.
 * Keep the surface area small and generic so swapping databases is easy.
 */

import type { Course, Instructor } from "./models";

export interface Repo {
  /* -------- Course -------- */
  getCourses(): Promise<Course[]>;
  getCourseById(id: number): Promise<Course | null>;
  createCourse(data: Omit<Course, "id" | "created_at" | "published_at">): Promise<Course>;
  listInstructorCourses(instructorId: number): Promise<Course[]>;
  publishCourse(id: number): Promise<void>;
  catalog(): Promise<Course[]>;

  /* ------ Purchases ------ */
  recordPurchase(
    studentId: number,
    courseId: number,
    amount: number
  ): Promise<number>;

  instructorEarnings(instructorId: number): Promise<number>;

  /* ------ Instructor ------ */
  findInstructorByEmail(email: string): Promise<Instructor | null>;
  createInstructor(
    name: string,
    email: string,
    password_hash: string
  ): Promise<Instructor>;
}
