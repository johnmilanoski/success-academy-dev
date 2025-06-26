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

-- Students -----------------------------------------------------------------
CREATE TABLE students (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Track every purchase so we can compute instructor earnings
CREATE TABLE purchases (
  id         SERIAL PRIMARY KEY,
  student_id INTEGER      NOT NULL REFERENCES students(id),
  course_id  INTEGER      NOT NULL REFERENCES courses(id),
  amount     NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Course curriculum --------------------------------------------------------
CREATE TABLE modules (
  id         SERIAL PRIMARY KEY,
  course_id  INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title      TEXT    NOT NULL,
  position   INTEGER NOT NULL
);

CREATE TABLE lessons (
  id         SERIAL PRIMARY KEY,
  module_id  INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  title      TEXT    NOT NULL,
  position   INTEGER NOT NULL
);

CREATE TABLE media_files (
  id         SERIAL PRIMARY KEY,
  lesson_id  INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  filename   TEXT    NOT NULL,
  mime_type  TEXT    NOT NULL,
  url        TEXT    NOT NULL
);

-- Affiliate program -------------------------------------------------------
CREATE TABLE affiliates (
  id         SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(id),
  sponsor_id INTEGER REFERENCES students(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE commissions (
  id           SERIAL PRIMARY KEY,
  purchase_id  INTEGER NOT NULL REFERENCES purchases(id),
  instructor_id INTEGER NOT NULL REFERENCES instructors(id),
  level        INTEGER NOT NULL,
  amount       NUMERIC(10,2) NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- add other tables below if you already had them …
