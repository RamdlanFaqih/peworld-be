const express = require("express");
const router = express.Router();
const {
    list,
    insert,
    login,
    update,
    updateWorkersProfilePicture,
    destroy,
    register,
    getByWorkers_ID,
    getWorkersWithSkill
} = require("../controller/workers.controller")
const auth = require("../middleware/staticAuth");
const upload = require("../middleware/upload");

router

// Select All
.get("/workers", list)

// Select by id
.get("/workers/:workers_id", getByWorkers_ID)

// Select workers with recipes
.get("/workers/skill/:workers_id", getWorkersWithSkill)

// Post Data
.post("/insertWorkers", upload, insert)
.post("/register/workers", register)

//login
.post("/login/workers", login)

// Update Data
.put("/update/workers/:workers_id", upload, update)

//Update Data Profile Picture
.put("/update/workers/workers_profile_picture/:workers_id", upload, updateWorkersProfilePicture)

.delete("/deleteWorkers/:workers_id", destroy)

module.exports = router;