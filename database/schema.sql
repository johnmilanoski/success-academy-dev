-- Success-Academy DB schema
-- ---------------------------------------------------------------

CREATE TABLE instructors (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE courses (
  id            SERIAL PRIMARY KEY,
  instructor_id INTEGER     NOT NULL REFERENCES instructors(id),
  title         TEXT        NOT NULL,
  description   TEXT,
  category      TEXT,                         -- NEW
  price         NUMERIC     NOT NULL,
  visibility    BOOLEAN     DEFAULT TRUE,
  published     BOOLEAN     DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  published_at  TIMESTAMPTZ                   -- NEW
);

-- Track every purchase so we can compute instructor earnings
CREATE TABLE purchases (                       -- NEW
  id         SERIAL PRIMARY KEY,
  student_id INTEGER      NOT NULL REFERENCES students(id), -- assumes students table exists
  course_id  INTEGER      NOT NULL REFERENCES courses(id),
  amount     NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- add other tables below if you already had them …

-- Purchases ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS purchases(
  id SERIAL PRIMARY KEY,
  student_id INT,
  course_id  INT REFERENCES courses(id),
  amount     NUMERIC(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
