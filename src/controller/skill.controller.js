const skillModel = require("../model/skill.model");

const skillController = {
  list: (req, res) => {
    let search = req.query.search || "";
    let sort = req.query.sort || "ASC";
    skillModel
      .selectAll(search, sort)
      .then((result) => {
        res.json({ message: result });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },
  getBySkill_ID: (req, res) => {
    const skill_id = req.params.skill_id;
    skillModel
      .selectBySkill_ID(skill_id)
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
        skill_name,
        workers_id
      } = req.body;
      const data = {
        skill_name,
        workers_id
      };
      console.log(data);
      skillModel
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
      const skill_id = req.params.skill_id;

      const oldData = await skillModel.selectBySkill_ID(
        skill_id
      );
      console.log(oldData.rowCount);
      if (!oldData.rowCount) {
        return res.json({ message: "data not found" });
      }

      const data = {
        skill_id,
        skill_name: req.body.skill_name|| oldData.skill_name,
      };
      console.log(data);
      await skillModel
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
    const skill_id = req.params.skill_id;
    skillModel
      .destroyData(skill_id)
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

module.exports = skillController;
