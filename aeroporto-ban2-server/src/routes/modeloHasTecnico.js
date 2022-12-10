const express = require("express");
const router = express.Router();

const {
  getAll,
  register,
  del,
} = require("../controllers/modeloHasTecnico.js");

router.get("/", getAll);

router.post("/", register);

router.delete("/:id", del);

module.exports = router;
