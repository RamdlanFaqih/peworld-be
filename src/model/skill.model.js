const db = require("../config/db");

const skillModel = {
  selectAll: (search, sort) => {
    let sortDirection = sort === "DESC" ? "DESC" : "ASC";
    return db.query(
      `
                SELECT * FROM skill 
                WHERE skill.skill_name LIKE $1
                ORDER BY skill.skill_name ${sortDirection}
                    `,
      [`%${search}%`]
    );
  },
  selectPaginate: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT COUNT (*) AS total FROM skill", (err, res) => {
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
        `SELECT * FROM skill LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  selectBySkill_ID: (skill_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM skill WHERE skill_id = ${skill_id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  insertData: ({ skill_name, workers_id }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO skill(skill_name, workers_id) VALUES 
          ('${skill_name}', '${workers_id}' )`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  updateData: ({ skill_id, skill_name }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE skill SET 
        skill_name='${skill_name}'
        WHERE skill_id=${skill_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  destroyData: (skill_id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM skill WHERE skill_id=${skill_id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = skillModel
