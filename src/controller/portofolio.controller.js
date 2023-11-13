const portofolioModel = require("../model/portofolio.model");
const cloudinary = require("../helper/cloudinary");

const portofolioController = {
  list: (req, res) => {
    let search = req.query.search || "";
    let sort = req.query.sort || "ASC";
    portofolioModel
      .selectAll(search, sort)
      .then((result) => {
        res.json({ message: result });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },
  getByPortofolio_ID: (req, res) => {
    const portofolio_id = req.params.portofolio_id;
    portofolioModel
      .selectByPortofolio_ID(portofolio_id)
      .then((result) => {
        res.send({
          data: result,
        });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },

  getPortofolioByWorkers_ID: (req, res) => {
    const workers_id = req.params.workers_id;
    portofolioModel
      .selectPortofolioByWorkers_ID(workers_id)
      .then((result) => {
        res.send({
          data: result,
        });
      })
      .catch((err) => {
        res.json({ message: err.message})
      })
  },

  insert: async (req, res) => {
    try {
      const {workers_id} = req.params
      const {
        app_name,
        repository,
        app_type,
      } = req.body;
      const image = await cloudinary.uploader.upload(req.file.path);
          const data = {
            app_name,
            repository,
            app_type,
            image: image.url,
            workers_id
          };
          console.log(data);
          portofolioModel
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
      const portofolio_id = req.params.portofolio_id;

      const oldData = await portofolioModel.selectByPortofolio_ID(
        portofolio_id
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

      const data = {
        portofolio_id,
        app_name: req.body.app_name || oldData.app_name,
        repository: req.body.repository || oldData.repository,
        app_type: req.body.app_type || oldData.app_type,
        image: image.url,
      };
      console.log(data);
      await portofolioModel
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
    const portofolio_id = req.params.portofolio_id;
    portofolioModel
      .destroyData(portofolio_id)
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

module.exports = portofolioController;
