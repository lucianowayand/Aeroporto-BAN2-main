const mongo = require("./mongo");

const GetAll = async () => {
  try {
    const resultado = await mongo.mongo
      .db("aeroporto")
      .collection("controladoraereo")
      .find()
      .toArray();
    return resultado;
  } catch (e) {
    throw new Error("Erro ao retornar controlador aéreo" + e);
  }
};

const Create = async (body) => {
  try {
    const funcionario = await mongo.mongo
      .db("aeroporto")
      .collection("funcionario")
      .findOne({ _id: body.nro_matricula });
    if (!funcionario) {
      throw new Error("Funcionário não existe");
    }
    const modelo = await mongo.mongo
      .db("aeroporto")
      .collection("controladoraereo")
      .insertOne({
        _id: body.nro_matricula,
        data_exame: body.data_exame,
      });
  } catch (e) {
    throw new Error("Erro ao registrar controlador aéreo " + e);
  }
};

const Update = async (body, id) => {
  try {
    const modelo = await mongo.mongo
      .db("aeroporto")
      .collection("controladoraereo")
      .updateOne(
        { _id: id },
        {
          $set: {
            data_exame: body.data_exame,
          },
        }
      );
  } catch (e) {
    throw new Error("Erro ao atualizar controlador aéreo " + e);
  }
};

const Delete = async (id) => {
  try {
    const modelo = await mongo.mongo
      .db("aeroporto")
      .collection("controladoraereo")
      .deleteOne({ _id: id });
  } catch (e) {
    throw new Error("Erro ao deletar modelo " + e);
  }
};

module.exports = { GetAll, Create, Update, Delete };
