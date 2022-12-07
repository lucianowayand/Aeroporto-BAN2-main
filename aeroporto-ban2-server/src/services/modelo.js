const mongo = require("./mongo");

const GetAll = async () => {
  try {
    const resultado = await mongo.mongo
      .db("aeroporto")
      .collection("modelo")
      .find()
      .toArray();
    return resultado;
  } catch (e) {
    throw new Error("Erro ao retornar modelos" + e);
  }
};

const Create = async (body) => {
  try {
    const modelo = await mongo.mongo
      .db("aeroporto")
      .collection("modelo")
      .insertOne({
        _id: body.codigo,
        capacidade: body.capacidade,
        peso: body.peso,
      });
  } catch (e) {
    throw new Error("Erro ao registrar modelo " + e);
  }
};

const Update = async (body, id) => {
  try {
    const modelo = await mongo.mongo
      .db("aeroporto")
      .collection("modelo")
      .updateOne(
        { _id: id },
        {
          $set: {
            capacidade: body.capacidade,
            peso: body.peso,
          },
        }
      );
  } catch (e) {
    throw new Error("Erro ao atualizar modelo " + e);
  }
};

const Delete = async (id) => {
  try {
    const modelo = await mongo.mongo
      .db("aeroporto")
      .collection("modelo")
      .deleteOne({ _id: id });
  } catch (e) {
    throw new Error("Erro ao deletar modelo " + e);
  }
};

module.exports = { GetAll, Create, Update, Delete };
