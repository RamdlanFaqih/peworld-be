const express = require("express");
const router = express.Router();
const {
    list,
    insert,
    update,
    destroy,
    getBySkill_ID,
    getSkillByWorkers_ID
} = require("../controller/skill.controller")

router

// Select All
.get("/skill", list)

// Select by id
.get("/skill/:skill_id", getBySkill_ID)

// Select by workers_id
.get("/skill/workers/:workers_id", getSkillByWorkers_ID)

// Post Data
.post("/skill/insert/:workers_id", insert)

// Update Data
.put("/skill/update/:skill_id", update)

// delete
.delete("/skill/delete/:skill_id", destroy)


module.exports = router