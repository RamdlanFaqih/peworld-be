
# Peworld Backend Documentation

Welcome to the comprehensive documentation detailing the powerhouse behind Peworld's backend development – the engine driving a seamless and efficient job-hiring platform. Crafted with cutting-edge technologies, our backend ensures flawless communication between the frontend and the PostgreSQL database, delivering a responsive and enjoyable experience for both employers and job seekers alike. Let's delve into the intricate workings of our APIs and explore the technological foundation that powers Peworld's robust hiring ecosystem.
## Table Of Content

- [Package Dependencies](#package-dependencies)
- [Database Schema](#database-schema)
- [Built With](#built-with)
- [Usage](#usage)
- [Contributing](#contributing)
- [Related Project](#related-project)
## Package Dependencies
```json
  "dependencies": {
    "bcrypt": "^5.1.1",
    "body-parser": "^1.20.2",
    "cloudinary": "^1.41.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "pg": "^8.11.3",
  },
```
## Database Schema
```
Workers Table
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


Recruiters Table
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


Portofolio Table
  portofolio_id SERIAL PRIMARY KEY,
  app_name VARCHAR(255) NOT NULL,
  repository TEXT NOT NULL,
  app_type VARCHAR(64) NOT NULL,
  image TEXT NOT NULL,
  workers_id INT NOT NULL


Experience Table
  experience_id SERIAL PRIMARY KEY,
  job_position VARCHAR(64) NOT NULL,
  company_name VARCHAR(64) NOT NULL,
  duration_employement TEXT NOT NULL,
  experience_desc TEXT NOT NULL,
  logo_company TEXT NULL,

Skill Table
  skill_id SERIAL PRIMARY KEY,
  skill_name VARCHAR(64) NOT NULL,
  workers_id INT NOT NULL


Hire Table
  hire_id SERIAL PRIMARY KEY,
  purpose VARCHAR(64) NOT NULL,
  email VARCHAR(64) NOT NULL,
  phone_number VARCHAR(64) NOT NULL,
  hire_desc TEXT NOT NULL,
  workers_id INT NOT NULL,
  recruiters_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```
## Built With
- **Node.js**: Backend runtime environment.
- **Express.js**: Web application framework for Node.js.
- **PostgreSQL**: Relational database management system for data storage.
- **JWT**: JSON Web Tokens for user authentication.

## Usage

1. Ensure Node.js and PostgreSQL are installed on your system.
2. Clone this repository to your local machine: `git clone https://github.com/RamdlanFaqih/peworld-be.git`
3. Navigate to the project directory: `cd peworld-be`
4. Install project dependencies: `npm install`
5. Set up your PostgreSQL database connection in `config/db.js`.
6. Run the server: `npm start`
7. Run API Endpoint
  
  
  API Enpoint are available in this postman documentation bellow

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/29238474-fbb5ebe3-90e9-49db-9695-1590bb463ae6?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D29238474-fbb5ebe3-90e9-49db-9695-1590bb463ae6%26entityType%3Dcollection%26workspaceId%3D26919c50-8540-4659-b77e-7f40b56795b6)
## Related Project
- [Peworld Frontend](https://github.com/RamdlanFaqih/peworld-next)
- [Peworld Demo](https://peworld-next-lac.vercel.app)