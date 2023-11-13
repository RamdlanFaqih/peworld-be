const db = require("../config/db");

const workersModel = {
  selectAll: (search, sort) => {
    let sortDirection = sort === "DESC" ? "DESC" : "ASC";
    let cleanSearch = search.replace(/[^a-zA-Z0-9 ]/g, " ");
    let searchTerm = `%${cleanSearch}%`;

    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT * FROM workers 
        WHERE LOWER(workers.name) ILIKE '${searchTerm}'
        ORDER BY workers.name ${sortDirection}
      `,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  selectPaginate: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) AS total FROM workers", (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },


  pagination: (limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM workers LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  selectByWorkers_ID: (workers_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM workers WHERE workers_id = ${workers_id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  selectWorkersWithSkill: (workers_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT 
        workers.workers_id, 
        workers.name AS workers_name, 
        workers.email AS workers_email, 
        workers.phone_number AS workers_phone_number, 
        workers.role AS workers_role,
        workers.image AS workers_image, 
        workers.profession AS workers_profession, 
        workers.residence AS workers_residence, 
        workers.workplace AS workers_workplace, 
        workers.workers_desc AS workers_workers_desc, 
        workers.work_category AS workers_work_category, 
        workers.github_url AS workers_github_url, 
        workers.instagram_url AS workers_instagram_url, 
        workers.gitlab_url AS workers_gitlab_url, 
        skill.workers_id, 
        skill.skill_name AS skill_skill_name 
      FROM 
        workers 
      LEFT JOIN 
        skill ON workers.workers_id = skill.workers_id 
      WHERE 
        workers.workers_id = ${workers_id}
      `,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  insertData: ({
    name,
    email,
    phone_number,
    password,
    role,
    image,
    profession,
    residence,
    workplace,
    workers_desc,
    work_category,
    github_url,
    instagram_url,
    gitlab_url,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO workers(name, email, phone_number, password, role, image, profession, residence, workplace, workers_desc, work_category, github_url, instagram_url, gitlab_url) VALUES 
          ('${name}', '${email}', '${phone_number}', '${password}', ${role}, '${image}', '${profession}', '${residence}', '${workplace}', '${workers_desc}', '${work_category}', '${github_url}', '${instagram_url}', '${gitlab_url}')`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  registerWorkers: ({ name, email, phone_number, password, role }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO workers(name, email, phone_number, password) VALUES 
          ('${name}', '${email}', '${phone_number}', '${password}', ${role})`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  loginWorkers: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM workers WHERE email = '${email}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  registerData: ({ name, email, phone_number, password, role }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO workers(name, email, phone_number, password, role) VALUES
          ('${name}', '${email}', '${phone_number}', '${password}', '${role}')`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  updateData: ({
    workers_id,
    name,
    email,
    phone_number,
    password,
    role,
    image,
    profession,
    residence,
    workplace,
    workers_desc,
    work_category,
    github_url,
    instagram_url,
    gitlab_url,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE workers SET name='${name}', email='${email}', phone_number='${phone_number}', password='${password}', role=${role}, image='${image}', profession='${profession}', residence='${residence}', workplace='${workplace}', workers_desc='${workers_desc}', work_category='${work_category}', github_url='${github_url}', instagram_url='${instagram_url}', gitlab_url='${gitlab_url}' WHERE workers_id=${workers_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  updateBiodata: ({
    workers_id,
    name,
    profession,
    residence,
    workplace,
    workers_desc,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE workers SET name='${name}', profession='${profession}', residence='${residence}', workplace='${workplace}', workers_desc='${workers_desc}' WHERE workers_id=${workers_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  updateProfilePicture: ({ workers_id, image }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE workers SET image='${image}' WHERE workers_id=${workers_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  destroyData: (workers_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM workers WHERE workers_id=${workers_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
};

module.exports = workersModel;
