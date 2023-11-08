const db = require("../config/db");

const hireModel = {
  selectAll: (search, sort) => {
    let sortDirection = sort === "DESC" ? "DESC" : "ASC";
    return db.query(
      `
            SELECT * FROM hire
            WHERE hire.purpose LIKE $1
            ORDER BY hire.purpose ${sortDirection}
            `,
      [`%${search}%`]
    );
  },
  selectPaginate: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT COUNT (*) AS total FROM hire", (err, res) => {
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
        `SELECT * FROM hire LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  selectByHire_ID: (hire_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM hire WHERE hire_id = ${hire_id}`,
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
    purpose,
    email,
    phone_number,
    hire_desc,
    workers_id,
    recruiters_id,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO hire(purpose, email, phone_number, hire_desc, workers_id, recruiters_id) VALUES 
          ('${purpose}', '${email}', '${phone_number}', '${hire_desc}', '${workers_id}', '${recruiters_id}' )`,
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
    hire_id,
    purpose,
    email,
    phone_number,
    hire_desc,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE hire SET 
        purpose='${purpose}',
        email='${email}',
        phone_number='${phone_number}',
        hire_desc='${hire_desc}'
        WHERE hire_id='${hire_id}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  destroyData: (hire_id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM hire WHERE hire_id=${hire_id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};
module.exports = hireModel;
