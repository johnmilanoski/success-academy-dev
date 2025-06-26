/**
 * Minimal model definitions.
 * Extend these fields to match your database schema as needed.
 */

export interface Instructor {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: string;          // ISO date string
}

export interface Course {
  id: number;
  instructor_id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  visibility: boolean;
  published: boolean;
  created_at: string;          // ISO date string
  published_at?: string | null; // ISO date or null (draft)
}

export interface Purchase {
  id: number;
  student_id: number;
  course_id: number;
  amount: number;
  created_at: string;
}
