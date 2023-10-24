const db = require("../config/db");

const experienceModel = {
  selectAll: (search, sort) => {
    let sortDirection = sort === "DESC" ? "DESC" : "ASC";
    return db.query(
      `
                SELECT * FROM experience 
                WHERE portofolio.company_name LIKE $1
                ORDER BY portofolio.company_name ${sortDirection}
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
        `SELECT * FROM portofolio WHERE portofolio_id = ${portofolio_id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
};
