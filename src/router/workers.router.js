const express = require("express");
const router = express.Router();
const {
    list,
    insert,
    login,
    update,
    destroy,
    getByWorkers_ID
} = require("../controller/workers.controller")
const auth = require("../middleware/staticAuth");
const upload = require("../middleware/upload");

router

// Select All
.get("/workers", list)

// Select by id
.get("/workers/:workers_id", getByWorkers_ID)

// Post Data
.post("/insertWorkers", upload, insert)

//login
.post("/login/workers", login)

// Update Data
.put("/update/workers/:workers_id", upload, update)

.delete("/deleteWorkers/:workers_id", destroy)

module.exports = router;