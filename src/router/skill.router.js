const express = require("express");
const router = express.Router();
const {
    list,
    insert,
    update,
    destroy,
    getBySkill_ID
} = require("../controller/skill.controller")

router

// Select All
.get("/skill", list)

// Select by id
.get("/skill/:skill_id", getBySkill_ID)

// Post Data
.post("/skill/insert", insert)

// Update Data
.put("/skill/update/:skill_id", update)

// delete
.delete("/skill/delete/:skill_id", destroy)


module.exports = router