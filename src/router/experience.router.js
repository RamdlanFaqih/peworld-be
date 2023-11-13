const express = require("express");
const router = express.Router();
const {
    list,
    insert,
    update,
    destroy,
    getByExperience_ID,
    getExperienceByWorkers_ID,
    insertDataExperience
} = require("../controller/experience.controller")
const upload = require("../middleware/upload");

router

// Select All
.get("/experience", list)

// Select by id
.get("/experience/:experience_id", getByExperience_ID)

// Select by workers_id
.get("/experience/workers/:workers_id", getExperienceByWorkers_ID)

// Post Data
.post("/experience/insert/:workers_id", upload, insert)

// Post Data without Logo Company
.post("/experience/insert/data/:workers_id", insertDataExperience)
// Update Data
.put("/experience/update/:experience_id", upload, update)

// delete
.delete("/experience/delete/:experience_id", destroy)

module.exports = router;