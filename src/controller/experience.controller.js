const experienceModel = require("../model/experience.model");
const cloudinary = require("../helper/cloudinary");

const experienceController = {
  list: (req, res) => {
    let search = req.query.search || "";
    let sort = req.query.sort || "ASC";
    experienceModel
      .selectAll(search, sort)
      .then((result) => {
        res.json({ message: result });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },
  getByExperience_ID: (req, res) => {
    const experience_id = req.params.experience_id;
    experienceModel
      .selectByExperience_ID(experience_id)
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
        job_position,
        company_name,
        duration_employement,
        experience_desc,
        workers_id
      } = req.body;
      const logo_company = await cloudinary.uploader.upload(req.file.path);
      const data = {
        job_position,
        company_name,
        duration_employement,
        experience_desc,
        logo_company: logo_company.url,
        workers_id
      };
      console.log(data);
      experienceModel
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
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  },
  update: async (req, res) => {
    try {
      const experience_id = req.params.experience_id;

      const oldData = await experienceModel.selectByExperience_ID(
        experience_id
      );
      console.log(oldData.rowCount);
      if (!oldData.rowCount) {
        return res.json({ message: "data not found" });
      }

      let logo_company;
      if (req.file) {
        logo_company = await cloudinary.uploader.upload(req.file.path);
      } else {
        logo_company = oldData.logo_company;
      }

      const data = {
        experience_id,
        job_position: req.body.job_position|| oldData.job_position,
        company_name: req.body.company_name || oldData.company_name,
        duration_employement: req.body.duration_employement || oldData.duration_employement,
        experience_desc: req.body.experience_desc || oldData.experience_desc,
        logo_company: logo_company.url,
      };
      console.log(data);
      await experienceModel
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
    const experience_id = req.params.experience_id;
    experienceModel
      .destroyData(experience_id)
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

module.exports = experienceController;
