const mongo = require("./mongo");

const GetAll = async () => {
  try {
    const resultado = await mongo.mongo
      .db("aeroporto")
      .collection("pericia")
      .find()
      .toArray();
    return resultado;
  } catch (e) {
    throw new Error("Erro ao retornar pericias" + e);
  }
};

const Create = async (body) => {
  try {
    const empregado = await mongo.mongo
      .db("aeroporto")
      .collection("empregado")
      .findOne({ _id: body.nro_matricula });
    if (!empregado) {
      throw new Error("Empregado não existe");
    }
    const modelo = await mongo.mongo
      .db("aeroporto")
      .collection("modelo")
      .findOne({ _id: body.codigo_modelo });
    if (!modelo) {
      throw new Error("Modelo não existe");
    }
    const pericia = await mongo.mongo
      .db("aeroporto")
      .collection("pericia")
      .insertOne({
        _id:body.nro_matricula+body.codigo_modelo,
        nro_matricula: body.nro_matricula,
        codigo_modelo: body.codigo_modelo,
      });
  } catch (e) {
    throw new Error("Erro ao registrar pericia " + e);
  }
};

const Delete = async (id) => {
  try {
    const modelo = await mongo.mongo
      .db("aeroporto")
      .collection("pericia")
      .deleteOne({ _id: id });
  } catch (e) {
    throw new Error("Erro ao deletar pericia " + e);
  }
};

module.exports = { GetAll, Create, Delete };