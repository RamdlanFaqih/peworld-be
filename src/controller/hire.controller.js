const hireModel = require("../model/hire.model");

const hireController = {
  list: (req, res) => {
    let search = req.query.search || "";
    let sort = req.query.sort || "ASC";
    hireModel
      .selectAll(search, sort)
      .then((result) => {
        res.json({ message: result });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },
  getByHire_ID: (req, res) => {
    const hire_id = req.params.hire_id;
    hireModel
      .selectByHire_ID(hire_id)
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
        purpose,
        email,
        phone_number,
        hire_desc,
        workers_id,
        recruiters_id,
      } = req.body;
      const data = {
        purpose,
        email,
        phone_number,
        hire_desc,
        workers_id,
        recruiters_id,
      };
      console.log(data);
      hireModel
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
      const hire_id = req.params.hire_id;

      const oldData = await hireModel.selectByHire_ID(
        hire_id
      );
      console.log(oldData.rowCount);
      if (!oldData.rowCount) {
        return res.json({ message: "data not found" });
      }

      const data = {
        hire_id,
        purpose: req.body.purpose|| oldData.purpose,
        email: req.body.email|| oldData.email,
        phone_number: req.body.phone_number|| oldData.phone_number,
        hire_desc: req.body.hire_desc|| oldData.hire_desc
      };
      console.log(data);
      await hireModel
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
    const hire_id = req.params.hire_id;
    hireModel
      .destroyData(hire_id)
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

module.exports = hireController;
