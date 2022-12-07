const express = require("express");
const router = express.Router();

const { getAll, register, update, del } = require("../controllers/modelo");

router.get("/", getAll);

router.post("/", register);

router.put("/:id", update);

router.delete("/:id", del);

module.exports = router;
