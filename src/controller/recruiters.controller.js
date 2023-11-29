const recruitersModel = require("../model/recruiters.model");
const { generateToken } = require("../helper/jwt");
const bcrypt = require("bcrypt");
const cloudinary = require("../helper/cloudinary");

const recruitersController = {
  list: (req, res) => {
    let search = req.query.search || "";
    let sort = req.query.sort || "ASC";
    recruitersModel
      .selectAll(search, sort)
      .then((result) => {
        res.json({ message: result });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },

  getByRecruiters_ID: (req, res) => {
    const recruiters_id = req.params.recruiters_id;
    recruitersModel
      .selectByRecruiters_ID(recruiters_id)
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
        company,
        job_position,
        phone_number,
        password,
        role,
        field,
        city,
        recruiters_desc,
        linkedin,
      } = req.body;
      const image = await cloudinary.uploader.upload(req.file.path);

      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          res.json({ message: "error hash password" });
        } else {
          const data = {
            name,
            email,
            company,
            job_position,
            phone_number,
            password: hash,
            role,
            image: image.url,
            field,
            city,
            recruiters_desc,
            linkedin,
          };
          console.log(data);
          recruitersModel
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
      const {
        name,
        email,
        company,
        job_position,
        phone_number,
        password,
        role = 0,
      } = req.body;
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          res.json({ message: "error hash password" });
        } else {
          const data = {
            name,
            email,
            company,
            job_position,
            phone_number,
            password: hash,
            role,
          };
          console.log(data);
          recruitersModel
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
    recruitersModel.loginRecruiters(email).then((data) => {
      const recruitersId = data.rows[0].recruiters_id;
      const recruitersRole = data.rows[0].role;
      const recruitersPassword = data.rows[0].password;
      if (data.rowCount > 0) {
        bcrypt.compare(password, recruitersPassword).then(async (result) => {
          console.log(result);
          if (result) {
            const token = await generateToken({
              role: recruitersRole,
            });
            res.json({
              message: "LOGIN BERHASIL",
              generateToken: token,
              recruitersId: recruitersId,
              recruitersLevel: recruitersRole,
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
      const recruiters_id = req.params.recruiters_id;

      const oldData = await recruitersModel.selectByRecruiters_ID(
        recruiters_id
      );
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
        recruiters_id,
        name: req.body.name || oldData.name,
        email: req.body.email || oldData.email,
        company: req.body.company || oldData.company,
        job_position: req.body.job_position || oldData.job_position,
        phone_number: req.body.phone_number || oldData.phone_number,
        password: password,
        role: req.body.role || oldData.role,
        image: image.url,
        field: req.body.field || oldData.field,
        city: req.body.city || oldData.city,
        recruiters_desc: req.body.recruiters_desc || oldData.recruiters_desc,
        linkedin: req.body.linkedin || oldData.linkedin,
      };
      console.log(data);
      await recruitersModel
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
  updateRecruitersBiodata: async (req, res) => {
    try {
      const recruiters_id = req.params.recruiters_id;

      const oldData = await recruitersModel.selectByRecruiters_ID(
        recruiters_id
      );
      console.log(oldData.rowCount);
      if (!oldData.rowCount) {
        return res.json({ message: "data not found" });
      }

      const data = {
        recruiters_id,
        name: req.body.name || oldData.name,
        email: req.body.email || oldData.email,
        company: req.body.company || oldData.company,
        job_position: req.body.job_position || oldData.job_position,
        phone_number: req.body.phone_number || oldData.phone_number,
        field: req.body.field || oldData.field,
        city: req.body.city || oldData.city,
        recruiters_desc: req.body.recruiters_desc || oldData.recruiters_desc,
        linkedin: req.body.linkedin || oldData.linkedin,
      };
      console.log(data);
      await recruitersModel
        .updateBioata(data)
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
  updateProfileRecruiters: async (req, res) => {
    try {
      const recruiters_id = req.params.recruiters_id;

      const oldData = await recruitersModel.selectByRecruiters_ID(
        recruiters_id
      );
      console.log(oldData.rowCount);
      if (!oldData.rowCount) {
        return res.json({ message: "data not found" });
      }

      const data = {
        recruiters_id,
        company: req.body.company || oldData.company,
        phone_number: req.body.phone_number || oldData.phone_number,
        field: req.body.field || oldData.field,
        city: req.body.city || oldData.city,
        recruiters_desc: req.body.recruiters_desc || oldData.recruiters_desc,
        linkedin: req.body.linkedin || oldData.linkedin,
      };
      console.log(data);
      await recruitersModel
        .updateProfile(data)
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

  updateRecruitersProfilePicture: async (req, res) => {
    try {
      const recruiters_id = req.params.recruiters_id;
      const oldData = await recruitersModel.selectByRecruiters_ID(recruiters_id);
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
        recruiters_id,
        image: image.url,
      };
      console.log(data);
      await recruitersModel
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
    const recruiters_id = req.params.recruiters_id;
    recruitersModel
      .destroyData(recruiters_id)
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

module.exports = recruitersController;
