const db = require("../config/db");

const recruitersModel = {
  selectAll: (search, sort) => {
    let sortDirection = sort === "DESC" ? "DESC" : "ASC";
    return db.query(
      `
        SELECT * FROM recruiters 
        WHERE recruiters.name LIKE $1
        ORDER BY recruiters.name ${sortDirection}
            `,
      [`%${search}%`]
    );
  },
  selectPaginate: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT COUNT (*) AS total FROM recruiters", (err, res) => {
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
        `SELECT * FROM recruiters LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  selectByRecruiters_ID: (recruiters_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recruiters WHERE recruiters_id = ${recruiters_id}`,
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
    company,
    job_position,
    phone_number,
    password,
    role,
    image,
    field,
    city,
    recruiters_desc,
    linkedin,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO recruiters(name, email, company, job_position, phone_number, password, role, image, field, city, recruiters_desc, linkedin) VALUES 
          ('${name}', '${email}', '${company}', '${job_position}', '${phone_number}', '${password}', '${role}', '${image}', '${field}', '${city}', '${recruiters_desc}', '${linkedin}')`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  registerData: ({
    name,
    email,
    company,
    job_position,
    phone_number,
    password,
    role,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO recruiters(name, email, company, job_position, phone_number, password, role) VALUES 
          ('${name}', '${email}', '${company}', '${job_position}', '${phone_number}', '${password}', '${role}')`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  
  loginRecruiters: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recruiters WHERE email = '${email}'`,
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
    recruiters_id,
    name,
    email,
    company,
    job_position,
    phone_number,
    password,
    role,
    image,
    field,
    city,
    recruiters_desc,
    linkedin,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE recruiters SET 
        name='${name}', 
        email='${email}', 
        company='${company}', 
        job_position='${job_position}', 
        phone_number='${phone_number}', 
        password='${password}', 
        role='${role}', 
        image='${image}', 
        field='${field}', 
        city='${city}', 
        recruiters_desc='${recruiters_desc}', 
        linkedin='${linkedin}' 
        WHERE recruiters_id=${recruiters_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  updateBioata: ({
    recruiters_id,
    name,
    email,
    company,
    job_position,
    phone_number,
    field,
    city,
    recruiters_desc,
    linkedin,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE recruiters SET 
        name='${name}', 
        email='${email}', 
        company='${company}', 
        job_position='${job_position}', 
        phone_number='${phone_number}', 
        field='${field}', 
        city='${city}', 
        recruiters_desc='${recruiters_desc}', 
        linkedin='${linkedin}' 
        WHERE recruiters_id=${recruiters_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  updateProfile: ({
    recruiters_id,
    company,
    phone_number,
    field,
    city,
    recruiters_desc,
    linkedin,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE recruiters SET 
        company='${company}', 
        phone_number='${phone_number}', 
        field='${field}', 
        city='${city}', 
        recruiters_desc='${recruiters_desc}', 
        linkedin='${linkedin}' 
        WHERE recruiters_id=${recruiters_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  destroyData: (recruiters_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM recruiters WHERE recruiters_id=${recruiters_id}`,
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

module.exports = recruitersModel;
