-- Active: 1693398029625@@localhost@5432@db_peworld

CREATE TABLE workers (
  workers_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role INT,
  image TEXT NULL, 
  profession VARCHAR(64) NULL,
  residence VARCHAR(64) NULL,
  workplace VARCHAR(64) NULL,
  workers_desc TEXT NULL, 
  work_category VARCHAR(64) NULL,
  github_url TEXT NULL,
  instagram_url TEXT NULL,
  gitlab_url TEXT NULL
);

CREATE TABLE recruiters (
    recruiters_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(64) NOT NULL,
    job_position VARCHAR(64) NOT NULL,
    phone_number VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL,
    role INT,
    image TEXT NULL,
    field VARCHAR(64) NULL,
    city VARCHAR(64) NULL,
    recruiters_desc VARCHAR(64) NULL,
    linkedin VARCHAR(64) NULL
);

CREATE TABLE portofolio (
  portofolio_id SERIAL PRIMARY KEY,
  app_name VARCHAR(255) NOT NULL,
  repository TEXT NOT NULL,
  app_type VARCHAR(64) NOT NULL,
  image TEXT NOT NULL,
  workers_id INT NOT NULL
);

CREATE TABLE experience (
  experience_id SERIAL PRIMARY KEY,
  job_position VARCHAR(64) NOT NULL,
  company_name VARCHAR(64) NOT NULL,
  duration_employement TEXT NOT NULL,
  experience_desc TEXT NOT NULL,
  logo_company TEXT NULL,
  workers_id INT NOT NULL
);

CREATE TABLE skill (
  skill_id SERIAL PRIMARY KEY,
  skill_name VARCHAR(64) NOT NULL,
  workers_id INT NOT NULL
);

CREATE TABLE hire (
  hire_id SERIAL PRIMARY KEY,
  purpose VARCHAR(64) NOT NULL,
  email VARCHAR(64) NOT NULL,
  phone_number VARCHAR(64) NOT NULL,
  hire_desc TEXT NOT NULL,
  workers_id INT NOT NULL,
  recruiters_id INT NOT NULL,
  reated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE hire
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

DROP TABLE portofolio

DROP TABLE experience

DROP TABLE hire