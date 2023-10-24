const workersModel = require("../model/workers.model");
const { generateToken } = require("../helper/jwt");
const bcrypt = require("bcrypt");
const cloudinary = require("../helper/cloudinary");

const workersController = {
  list: (req, res) => {
    let search = req.query.search || "";
    let sort = req.query.sort || "ASC";
    workersModel
      .selectAll(search, sort)
      .then((result) => {
        res.json({ message: result });
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
  login: (req, res) => {
    const { email, password } = req.body;
    workersModel.loginWorkers(email).then((data) => {
      const workersId = data.rows[0].workers_id;
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
              workersId: workersId,
              workersLevel: workersRole,
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
        profession : req.body.profession || oldData.profession,
        residence: req.body.residence || oldData.residence,
        workplace: req.body.workplace || oldData.workplace,
        work_category: req.body.work_category || oldData.work_category,
        workers_desc: req.body.workers_desc || oldData.workers_desc,
        github_url: req.body.github_url || oldData.github_url,
        instagram_url: req.body.instagram_url || oldData.instagram,
        gitlab_url: req.body.gitlab_url || oldData.gitlab
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

  destroy: (req, res) => {
    const workers_id = req.params.workers_id;
    workersModel
        .destroyData(workers_id)
        .then((result) => {
            res.json({
                Data: result,
                message: 'data deleted successfully',
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
