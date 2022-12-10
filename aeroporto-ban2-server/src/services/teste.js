const mongo = require("./mongo");

const GetAll = async () => {
  try {
    const resultado = await mongo.mongo
      .db("aeroporto")
      .collection("teste")
      .find()
      .toArray();
    return resultado;
  } catch (e) {
    throw new Error("Erro ao retornar testes" + e);
  }
};

const Create = async (body) => {
  try {
    const modelo = await mongo.mongo
      .db("aeroporto")
      .collection("teste")
      .insertOne({
        _id: body.nro_anac,
        nome: body.nome,
        pont_max: body.pont_max,
      });
  } catch (e) {
    throw new Error("Erro ao registrar testes " + e);
  }
};

const Update = async (body, id) => {
  try {
    const modelo = await mongo.mongo
      .db("aeroporto")
      .collection("teste")
      .updateOne(
        { _id: id },
        {
          $set: {
            nome: body.nome,
            pont_max: body.pont_max,
          },
        }
      );
  } catch (e) {
    throw new Error("Erro ao atualizar testes " + e);
  }
};

const Delete = async (id) => {
  try {
    const modelo = await mongo.mongo
      .db("aeroporto")
      .collection("teste")
      .deleteOne({ _id: id });
  } catch (e) {
    throw new Error("Erro ao deletar testes " + e);
  }
};

module.exports = { GetAll, Create, Update, Delete };
