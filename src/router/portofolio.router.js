const express = require("express");
const router = express.Router();
const {
    list,
    insert,
    update,
    destroy,
    getByPortofolio_ID
} = require("../controller/portofolio.controller")
const upload = require("../middleware/upload");

router

// Select All
.get("/portofolio", list)

// Select by id
.get("/portofolio/:portofolio_id", getByPortofolio_ID)

// Post Data
.post("/portofolio/insert", upload, insert)

// Update Data
.put("/portofolio/update/:portofolio_id", upload, update)

// delete
.delete("/portofolio/delete/:portofolio_id", destroy)

module.exports = router;