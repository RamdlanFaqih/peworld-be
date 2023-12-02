const express = require("express");
const router = express.Router();
const {
    list,
    insert,
    update,
    destroy,
    getByHire_ID,
    getByWorkers_ID
} = require("../controller/hire.controller")

router

// Select All
.get("/hire", list)

// Select by id
.get("/hire/:hire_id", getByHire_ID)


// Select by users_id
.get("/hire/workers/:workers_id", getByWorkers_ID)
// Post Data
.post("/hire/insert/:recruiters_id", insert)

// Update Data
.put("/hire/update/:hire_id", update)

// delete
.delete("/hire/delete/:hire_id", destroy)


module.exports = router