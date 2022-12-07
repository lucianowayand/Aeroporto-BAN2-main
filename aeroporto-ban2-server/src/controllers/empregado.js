const {
  GetAll,
  GetAllTecnicos,
  Create,
  Update,
  Delete,
} = require("../services/empregado");

const getAll = async (req, res, next) => {
  try {
    const empregados = await GetAll();
    res.status(200).json({
      empregados,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const getAllTecnicos = async (req, res, next) => {
  try {
    const empregados = await GetAllTecnicos();
    res.status(200).json({
      empregados,
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
      message: "Empregado registrado com sucesso",
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
      message: "Empregado atualizado com sucesso",
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
      message: "Empregado deletado com sucesso",
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

module.exports = { getAll, getAllTecnicos, register, update, del };
