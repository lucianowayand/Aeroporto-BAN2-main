const mongo = require("./mongo");

const GetAll = async () => {
    try {
      const resultado = await mongo.mongo
        .db("aeroporto")
        .collection("empregado")
        .find()
        .toArray();
      return resultado;
    } catch (e) {
      throw new Error("Erro ao retornar empregados" + e);
    }
  };

const GetAllTecnicos = async () => {
    try {
      const resultado = await mongo.mongo
        .db("aeroporto")
        .collection("empregado")
        .find()
        .toArray();
        const newResultado = []
        resultado.forEach((value, index) => {
            if (value.tecnico){
                newResultado.push(value)
            }
        })
      return newResultado;
    } catch (e) {
      throw new Error("Erro ao retornar empregados técnico" + e);
    }
  };

const Create = async (body) => {
  try {
    const empregado = await mongo.mongo
      .db("aeroporto")
      .collection("empregado")
      .insertOne({
        _id: body.nro_matricula,
        endereco: body.endereco,
        telefone: body.telefone,
        salario: body.salario,
        nro_sindicato: body.nro_sindicato,
        tecnico: body.tecnico,
      });
  } catch (e) {
    throw new Error("Erro ao registrar empregado " + e);
  }
};

const Update = async (body, id) => {
  try {
    const empregado = await mongo.mongo
      .db("aeroporto")
      .collection("empregado")
      .updateOne(
        { _id: id },
        {
          $set: {
            endereco: body.endereco,
            telefone: body.telefone,
            salario: body.salario,
            nro_sindicato: body.nro_sindicato,
            tecnico: body.tecnico,
          },
        }
      );
  } catch (e) {
    throw new Error("Erro ao atualizar empregado " + e);
  }
};

const Delete = async (id) => {
  try {
    const empregado = await mongo.mongo
      .db("aeroporto")
      .collection("empregado")
      .deleteOne({ _id: id });
  } catch (e) {
    throw new Error("Erro ao deletar empregado " + e);
  }
};

module.exports = { GetAll, GetAllTecnicos, Create, Update, Delete };
