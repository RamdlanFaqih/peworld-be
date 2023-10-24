const express = require("express");
const router = express.Router();
const {
    list,
    insert,
    login,
    update,
    destroy,
    getByRecruiters_ID
} = require("../controller/recruiters.controller")
const auth = require("../middleware/staticAuth");
const upload = require("../middleware/upload");

router

// Select All
.get("/recruiters", list)

// Select by id
.get("/recruiters/:recruiters_id", getByRecruiters_ID)

// Post Data
.post("/recruiters/insert", upload, insert)

//login
.post("/recruiters/login", login)

// Update Data
.put("/recruiters/update/:recruiters_id", upload, update)

.delete("/recruiters/delete/:recruiters_id", destroy)

module.exports = router;