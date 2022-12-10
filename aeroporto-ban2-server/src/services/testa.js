const mongo = require("./mongo");

const GetAll = async () => {
  try {
    const resultado = await mongo.mongo
      .db("aeroporto")
      .collection("testa")
      .find()
      .toArray();
    return resultado;
  } catch (e) {
    throw new Error("Erro ao retornar registro de testes" + e);
  }
};

const Create = async (body) => {
  try { 
    const funcionario = await mongo.mongo
      .db("aeroporto")
      .collection("empregado")
      .findOne({ _id: body.nro_tecnico });
      console.log(funcionario)
    if (!funcionario) {
      throw new Error("Funcionário não existe");
    }
    const aviao = await mongo.mongo
      .db("aeroporto")
      .collection("aviao")
      .findOne({ _id: body.num_reg });
    if (!aviao) {
      throw new Error("Avião não existe");
    }
    const teste = await mongo.mongo
      .db("aeroporto")
      .collection("teste")
      .findOne({ _id: body.nro_anac });
    if (!teste) {
      throw new Error("Teste não existe");
    }
    const resultado = await mongo.mongo
      .db("aeroporto")
      .collection("testa")
      .insertOne({
        _id: body.codigo,
        data_exame: body.data_exame,
        data: body.data,
        tempo: body.tempo,
        pontuacao: body.pontuacao,
        nro_anac: body.nro_anac,
        num_reg: body.num_reg,
        nro_tecnico: body.nro_tecnico,
      });
  } catch (e) {
    throw new Error("Erro ao registrar registro de testes " + e);
  }
};

const Update = async (body, id) => {
  try {
    const resultado = await mongo.mongo
      .db("aeroporto")
      .collection("testa")
      .updateOne(
        { _id: id },
        {
          $set: {
            data_exame: body.data_exame,
            data: body.data,
            tempo: body.tempo,
            pontuacao: body.pontuacao,
            nro_anac: body.nro_anac,
            num_reg: body.num_reg,
            nro_tecnico: body.nro_tecnico,
          },
        }
      );
  } catch (e) {
    throw new Error("Erro ao atualizar registro de testes " + e);
  }
};

const Delete = async (id) => {
  try {
    const resultado = await mongo.mongo
      .db("aeroporto")
      .collection("testa")
      .deleteOne({ _id: id });
  } catch (e) {
    throw new Error("Erro ao deletar registro de testes " + e);
  }
};

module.exports = { GetAll, Create, Update, Delete };
