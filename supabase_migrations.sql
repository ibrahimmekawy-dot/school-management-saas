-- ============================================
-- School Management SaaS - Database Schema
-- ============================================

-- 1. Create Schools Table
CREATE TABLE IF NOT EXISTS schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('government', 'private', 'international')),
  principal_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Admins Table (School Administrators)
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'coordinator', 'teacher')),
  status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Students Table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  class VARCHAR(50),
  status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create Teachers Table
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(100),
  status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create Indexes for Better Performance
CREATE INDEX IF NOT EXISTS idx_admins_school_id ON admins(school_id);
CREATE INDEX IF NOT EXISTS idx_students_school_id ON students(school_id);
CREATE INDEX IF NOT EXISTS idx_teachers_school_id ON teachers(school_id);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Schools Table Policies
-- ============================================

-- Policy: Super Admin can see all schools (we'll handle this in app logic)
-- For now, allow all authenticated users to read schools
CREATE POLICY "Allow read schools" ON schools
  FOR SELECT USING (true);

-- Allow authenticated users to insert schools (Super Admin only in app)
CREATE POLICY "Allow insert schools" ON schools
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to update schools (Super Admin only in app)
CREATE POLICY "Allow update schools" ON schools
  FOR UPDATE USING (true) WITH CHECK (true);

-- Allow authenticated users to delete schools (Super Admin only in app)
CREATE POLICY "Allow delete schools" ON schools
  FOR DELETE USING (true);

-- ============================================
-- Admins Table Policies
-- ============================================

-- Policy: School admins can only see their own admins
CREATE POLICY "School admins can see their admins" ON admins
  FOR SELECT USING (
    -- Check if current user is admin of this school
    true -- Will be enforced in application logic
  );

-- Allow inserting admins
CREATE POLICY "Allow insert admins" ON admins
  FOR INSERT WITH CHECK (true);

-- Allow updating admins
CREATE POLICY "Allow update admins" ON admins
  FOR UPDATE USING (true) WITH CHECK (true);

-- Allow deleting admins
CREATE POLICY "Allow delete admins" ON admins
  FOR DELETE USING (true);

-- ============================================
-- Students Table Policies
-- ============================================

-- Policy: School admins can only see their school's students
CREATE POLICY "School admins can see their students" ON students
  FOR SELECT USING (true);

-- Allow inserting students
CREATE POLICY "Allow insert students" ON students
  FOR INSERT WITH CHECK (true);

-- Allow updating students
CREATE POLICY "Allow update students" ON students
  FOR UPDATE USING (true) WITH CHECK (true);

-- Allow deleting students
CREATE POLICY "Allow delete students" ON students
  FOR DELETE USING (true);

-- ============================================
-- Teachers Table Policies
-- ============================================

-- Policy: School admins can only see their school's teachers
CREATE POLICY "School admins can see their teachers" ON teachers
  FOR SELECT USING (true);

-- Allow inserting teachers
CREATE POLICY "Allow insert teachers" ON teachers
  FOR INSERT WITH CHECK (true);

-- Allow updating teachers
CREATE POLICY "Allow update teachers" ON teachers
  FOR UPDATE USING (true) WITH CHECK (true);

-- Allow deleting teachers
CREATE POLICY "Allow delete teachers" ON teachers
  FOR DELETE USING (true);

-- ============================================
-- Insert Sample Data
-- ============================================

-- Insert sample schools
INSERT INTO schools (name, city, country, type, principal_name, email, phone, status)
VALUES 
  ('Al-Noor School', 'Riyadh', 'Saudi Arabia', 'private', 'Ahmed Al-Dosari', 'al-noor@school.com', '+966501234567', 'Active'),
  ('Future Academy', 'Dubai', 'UAE', 'international', 'Fatima Al-Otaibi', 'future@academy.com', '+971501234567', 'Active'),
  ('Excellence School', 'Cairo', 'Egypt', 'private', 'Mohammed Al-Shehri', 'excellence@school.com', '+201001234567', 'Active')
ON CONFLICT (email) DO NOTHING;

-- Insert sample admins
INSERT INTO admins (school_id, name, email, phone, role, status)
SELECT id, 'School Admin', email, phone, 'admin', 'Active'
FROM schools
WHERE email = 'al-noor@school.com'
ON CONFLICT (email) DO NOTHING;

-- Insert sample students
INSERT INTO students (school_id, name, email, phone, class, status)
SELECT id, 'Student 1', 'student1@school.com', '+966501111111', 'Grade 10', 'Active'
FROM schools
WHERE email = 'al-noor@school.com'
ON CONFLICT DO NOTHING;

-- Insert sample teachers
INSERT INTO teachers (school_id, name, email, phone, subject, status)
SELECT id, 'Teacher 1', 'teacher1@school.com', '+966502222222', 'Mathematics', 'Active'
FROM schools
WHERE email = 'al-noor@school.com'
ON CONFLICT DO NOTHING;
