const express = require("express");
const router = express.Router();
const {
    list,
    insert,
    update,
    destroy,
    getByExperience_ID
} = require("../controller/experience.controller")
const upload = require("../middleware/upload");

router

// Select All
.get("/experience", list)

// Select by id
.get("/experience/:experience_id", getByExperience_ID)

// Post Data
.post("/experience/insert", upload, insert)

// Update Data
.put("/experience/update/:experience_id", upload, update)

// delete
.delete("/experience/delete/:experience_id", destroy)

module.exports = router;