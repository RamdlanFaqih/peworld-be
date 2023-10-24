const db = require("../config/db");

const portofolioModel = {
  selectAll: (search, sort) => {
    let sortDirection = sort === "DESC" ? "DESC" : "ASC";
    return db.query(
      `
            SELECT * FROM portofolio 
            WHERE portofolio.app_name LIKE $1
            ORDER BY portofolio.app_name ${sortDirection}
                `,
      [`%${search}%`]
    );
  },
  selectPaginate: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT COUNT (*) AS total FROM portofolio", (err, res) => {
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
        `SELECT * FROM portofolio LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  
  selectByPortofolio_ID: (portofolio_id) => {
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
  insertData: ({ app_name, repository, app_type, image, workers_id }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO portofolio(app_name, repository, app_type, image, workers_id) VALUES 
          ('${app_name}', '${repository}', '${app_type}', '${image}', '${workers_id}' )`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  updateData: ({ portofolio_id, app_name, repository, app_type, image }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE portofolio SET 
        app_name='${app_name}', 
        repository='${repository}',
        app_type='${app_type}',
        image='${image}'
        WHERE portofolio_id=${portofolio_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  destroyData: (portofolio_id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM portofolio WHERE portofolio_id=${portofolio_id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = portofolioModel;
