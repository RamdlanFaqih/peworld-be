const workersModel = require("../model/workers.model");
const { generateToken } = require("../helper/jwt");
const bcrypt = require("bcrypt");
const cloudinary = require("../helper/cloudinary");

const workersController = {
  list: (req, res) => {
    let search = req.query.search || "";
    let sort = req.query.sort || "ASC";
  
    const { limit, page } = req.query;
    const pageValue = page ? Number(page) : 1;
    const limitValue = limit ? Number(limit) : 3;
    const offsetValue = pageValue === 1 ? 0 : (pageValue - 1) * limitValue;
  
    workersModel
      .selectPaginate()
      .then((allData) => {
        const totalData = Number(allData.rows[0].total);
  
        workersModel
          .selectAll(search, sort, limitValue, offsetValue)
          .then((result) => {
            const selectAll = {
              currentPage: pageValue,
              dataPerPage: limitValue,
              totalPage: Math.ceil(totalData / limitValue),
              totalData,
              result,
            };
            console.log(allData);
            console.log(limitValue);
            res.json({ message: "OK", result: selectAll });
          })
          .catch((err) => {
            res.json({ message: err.message });
          });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },
  

  getByWorkers_ID: (req, res) => {
    const workers_id = req.params.workers_id;
    workersModel
      .selectByWorkers_ID(workers_id)
      .then((result) => {
        res.send({
          data: result,
        });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },

  getWorkersWithSkill: async (req, res) => {
    try {
      const workers_id = req.params.workers_id;
      const workersWithSkill = await workersModel.selectWorkersWithSkill(
        workers_id
      );
      res.status(200).json(workersWithSkill);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "interval server error" });
    }
  },

  insert: async (req, res) => {
    try {
      const {
        name,
        email,
        phone_number,
        password,
        role,
        profession,
        residence,
        workplace,
        workers_desc,
        work_category,
        github_url,
        instagram_url,
        gitlab_url,
      } = req.body;
      const image = await cloudinary.uploader.upload(req.file.path);

      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          res.json({ message: "error hash password" });
        } else {
          const data = {
            name,
            email,
            phone_number,
            password: hash,
            role,
            image: image.url,
            profession,
            residence,
            workplace,
            workers_desc,
            work_category,
            github_url,
            instagram_url,
            gitlab_url,
          };
          console.log(data);
          workersModel
            .insertData(data)
            .then((result) => {
              res.json({
                data: result,
                message: "Insert data berhasil",
              });
            })
            .catch((err) => {
              res.json({ message: err.message });
            });
        }
      });
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  },
  register: async (req, res) => {
    try {
      const { name, email, phone_number, password, role = 1 } = req.body;
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          res.json({ message: "error hash password" });
        } else {
          const data = {
            name,
            email,
            phone_number,
            password: hash,
            role,
          };
          console.log(data);
          workersModel
            .registerData(data)
            .then((result) => {
              res.json({
                data: result,
                message: "Insert data berhasil",
              });
            })
            .catch((err) => {
              res.json({ message: err.message });
            });
        }
      });
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  },
  login: (req, res) => {
    const { email, password } = req.body;
    workersModel.loginWorkers(email).then((data) => {
      const workers_id = data.rows[0].workers_id;
      const workersRole = data.rows[0].role;
      const workersPassword = data.rows[0].password;
      if (data.rowCount > 0) {
        bcrypt.compare(password, workersPassword).then(async (result) => {
          console.log(result);
          if (result) {
            const token = await generateToken({
              role: workersRole,
            });
            res.json({
              message: "LOGIN BERHASIL",
              generateToken: token,
              workers_id: workers_id,
              role: workersRole,
            });
          } else {
            res.json({
              message: "LOGIN GAGAL",
            });
          }
        });
      }
    });
  },

  update: async (req, res) => {
    try {
      const workers_id = req.params.workers_id;

      const oldData = await workersModel.selectByWorkers_ID(workers_id);
      console.log(oldData.rowCount);
      if (!oldData.rowCount) {
        return res.json({ message: "data not found" });
      }

      let image;
      if (req.file) {
        image = await cloudinary.uploader.upload(req.file.path);
      } else {
        image = oldData.image;
      }

      let password;
      if (req.body.password) {
        password = await bcrypt.hash(req.body.password, 10);
      } else {
        password = oldData.password;
      }

      const data = {
        workers_id,
        name: req.body.name || oldData.name,
        email: req.body.email || oldData.email,
        phone_number: req.body.phone_number || oldData.phone_number,
        password: password,
        image: image.url,
        role: req.body.role || oldData.role,
        profession: req.body.profession || oldData.profession,
        residence: req.body.residence || oldData.residence,
        workplace: req.body.workplace || oldData.workplace,
        work_category: req.body.work_category || oldData.work_category,
        workers_desc: req.body.workers_desc || oldData.workers_desc,
        github_url: req.body.github_url || oldData.github_url,
        instagram_url: req.body.instagram_url || oldData.instagram,
        gitlab_url: req.body.gitlab_url || oldData.gitlab,
      };
      console.log(data);
      await workersModel
        .updateData(data)
        .then((result) => {
          res.json({
            data: result,
            message: "data updated successfully",
          });
        })
        .catch((err) => {
          res.json({
            message: err.message,
          });
        });
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  },

  updateWorkersBiodata: async (req, res) => {
    try {
      const workers_id = req.params.workers_id;
      const oldData = await workersModel.selectByWorkers_ID(workers_id);
      console.log(oldData.rowCount);
      if (!oldData.rowCount) {
        return res.json({ message: "data not found" });
      }

      const data = {
        workers_id,
        name: req.body.name || oldData.name,
        profession: req.body.profession || oldData.profession,
        residence: req.body.residence || oldData.residence,
        workplace: req.body.workplace || oldData.workplace,
        work_category: req.body.work_category || oldData.work_category,
        workers_desc: req.body.workers_desc || oldData.workers_desc,
      };
      console.log(data);
      await workersModel
        .updateBiodata(data)
        .then((result) => {
          res.json({
            data: result,
            message: "biodata updated successfully",
          });
        })
        .catch((err) => {
          res.json({
            message: err.message,
          });
        });
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  },

  updateWorkersProfilePicture: async (req, res) => {
    try {
      const workers_id = req.params.workers_id;
      const oldData = await workersModel.selectByWorkers_ID(workers_id);
      console.log(oldData.rowCount);
      if (!oldData.rowCount) {
        return res.json({ message: "data not found" });
      }

      let image;
      if (req.file) {
        image = await cloudinary.uploader.upload(req.file.path);
        console.log(image);
      } else {
        image = oldData.image;
      }

      const data = {
        workers_id,
        image: image.url,
      };
      console.log(data);
      await workersModel
        .updateProfilePicture(data)
        .then((result) => {
          res.json({
            data: result,
            message: "data updated successfully",
          });
        })
        .catch((err) => {
          res.json({
            message: err.message,
          });
        });
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  },

  destroy: (req, res) => {
    const workers_id = req.params.workers_id;
    workersModel
      .destroyData(workers_id)
      .then((result) => {
        res.json({
          Data: result,
          message: "data deleted successfully",
        });
      })
      .catch((err) => {
        res.json({
          message: err.message,
        });
      });
  },
};

module.exports = workersController;
