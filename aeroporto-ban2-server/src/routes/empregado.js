const express = require("express");
const router = express.Router();

const {
  getAll,
  getAllTecnicos,
  register,
  update,
  del,
} = require("../controllers/empregado");

router.get("/", getAll);

router.get("/tecnico", getAllTecnicos);

router.post("/", register);

router.put("/:id", update);

router.delete("/:id", del);

module.exports = router;
