const mongo = require("./mongo");

const GetAll = async () => {
  try {
    const resultado = await mongo.mongo
      .db("aeroporto")
      .collection("aviao")
      .find()
      .toArray();
    return resultado;
  } catch (e) {
    throw new Error("Erro ao retornar aviões" + e);
  }
};

const Create = async (body) => {
  try {
    const modelo = await mongo.mongo
      .db("aeroporto")
      .collection("modelo")
      .findOne({ _id: body.codigo_modelo });
    if (!modelo) {
      throw new Error("Modelo não existe");
    }
    const aviao = await mongo.mongo
      .db("aeroporto")
      .collection("aviao")
      .insertOne({
        _id: body.num_reg,
        codigo_modelo: body.codigo_modelo,
      });
  } catch (e) {
    throw new Error("Erro ao registrar avião " + e);
  }
};

const Update = async (body, id) => {
  try {
    const modelo = await mongo.mongo
      .db("aeroporto")
      .collection("modelo")
      .findOne({ _id: body.codigo_modelo });
    if (!modelo) {
      throw new Error("Modelo não existe");
    }
    const aviao = await mongo.mongo
      .db("aeroporto")
      .collection("aviao")
      .updateOne(
        { _id: id },
        {
          $set: {
            codigo_modelo: body.codigo_modelo,
          },
        }
      );
  } catch (e) {
    throw new Error("Erro ao atualizar avião " + e);
  }
};

const Delete = async (id) => {
  try {
    const modelo = await mongo.mongo
      .db("aeroporto")
      .collection("aviao")
      .deleteOne({ _id: id });
  } catch (e) {
    throw new Error("Erro ao deletar avião " + e);
  }
};

module.exports = { GetAll, Create, Update, Delete };
