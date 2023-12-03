const express = require("express");
const router = express.Router();
const {
    list,
    insert,
    login,
    update,
    updateWorkersProfilePicture,
    updateWorkersBiodata,
    destroy,
    register,
    getByWorkers_ID,
    getWorkersWithSkill,
} = require("../controller/workers.controller")
const upload = require("../middleware/upload");

router

// Select All
.get("/workers", list)


// Select by id
.get("/workers/:workers_id", getByWorkers_ID)

// Select workers with skill
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

//Update Workers Biodata
.put("/update/workers/biodata/:workers_id", updateWorkersBiodata)

.delete("/deleteWorkers/:workers_id", destroy)

module.exports = router;