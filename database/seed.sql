INSERT INTO instructors (name, email, password_hash)
VALUES
  ('Alice Trainer', 'alice@success.academy', 'hash1'),
  ('Bob Coach', 'bob@success.academy', 'hash2');

INSERT INTO courses (instructor_id, title, description, category, price, visibility, published)
VALUES
  (1, 'React for Beginners', 'Learn React 19 from scratch', 'Web Dev', 49.00, true, true),
  (1, 'Advanced Tailwind', 'Utility-first mastery', 'Design', 59.00, true, true),
  (2, 'Success Mindset', 'Habits & psychology', 'Personal Dev', 29.00, true, false);
