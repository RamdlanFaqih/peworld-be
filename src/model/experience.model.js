const db = require("../config/db");

const experienceModel = {
  selectAll: (search, sort) => {
    let sortDirection = sort === "DESC" ? "DESC" : "ASC";
    return db.query(
      `
                SELECT * FROM experience 
                WHERE experience.company_name LIKE $1
                ORDER BY experience.company_name ${sortDirection}
                    `,
      [`%${search}%`]
    );
  },
  selectPaginate: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT COUNT (*) AS total FROM experience", (err, res) => {
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
        `SELECT * FROM experience LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  selectByExperience_ID: (experience_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM experience WHERE experience_id = ${experience_id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  insertData: ({ job_position, company_name, duration_employement, experience_desc, logo_company, workers_id }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO experience(job_position, company_name, duration_employement, experience_desc, logo_company, workers_id) VALUES 
          ('${job_position}', '${company_name}', '${duration_employement}', '${experience_desc}', '${logo_company}', '${workers_id}' )`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
},

  updateData: ({ experience_id, job_position, company_name, duration_employement, experience_desc, logo_company }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE experience SET 
        job_position='${job_position}', 
        company_name='${company_name}',
        duration_employement='${duration_employement}',
        experience_desc='${experience_desc}',
        logo_company='${logo_company}'
        WHERE experience_id=${experience_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  destroyData: (experience_id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM experience WHERE experience_id=${experience_id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = experienceModel