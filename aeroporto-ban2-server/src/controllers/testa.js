const { GetAll, Create, Update, Delete } = require("../services/testa");

const getAll = async (req, res, next) => {
  try {
    const testas = await GetAll();
    res.status(200).json({
      testas,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const register = async (req, res, next) => {
  try {
    await Create(req.body);
    res.status(200).json({
      message: "Registro de teste registrado com sucesso",
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const update = async (req, res, next) => {
  try {
    await Update(req.body, req.params.id);
    res.status(200).json({
      message: "Registro de teste atualizado com sucesso",
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const del = async (req, res, next) => {
  try {
    await Delete(req.params.id);
    res.status(200).json({
      message: "Registro de teste deletado com sucesso",
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

module.exports = { getAll, register, update, del };
