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

// const GetAll = async () => {
//   try {
//     const empregado = await prisma.$queryRaw`SELECT * FROM empregado`;
//     return empregado;
//   } catch (e) {
//     throw new Error("Erro ao retornar empregado. " + e);
//   }
// };

// const GetAllTecnicos = async () => {
//   try {
//     const empregado =
//       await prisma.$queryRaw`SELECT * FROM empregado where tecnico`;
//     return empregado;
//   } catch (e) {
//     throw new Error("Erro ao retornar empregado. " + e);
//   }
// };

// const Create = async (body) => {
//   try {
//     const empregado = await prisma.$queryRaw`Insert into empregado values (
//       ${body.nro_matricula},
//       ${body.endereco},
//       ${body.telefone},
//       ${body.salario},
//       ${body.nro_sindicato},
//       ${body.tecnico})`;
//   } catch (e) {
//     throw new Error("Erro ao registrar empregado. " + e);
//   }
// };

// const Update = async (body, id) => {
//   try {
//     const empregado = await prisma.$queryRaw`Update empregado set
//       nro_matricula = ${parseInt(body.nro_matricula)},
//       endereco = ${body.endereco},
//       telefone = ${body.telefone},
//       salario = ${parseFloat(body.salario)},
//       nro_sindicato = ${parseInt(body.nro_sindicato)},
//       tecnico = ${body.tecnico}
//       where nro_matricula = ${parseInt(id)}
//       `;
//   } catch (e) {
//     if (
//       e instanceof Prisma.PrismaClientKnownRequestError &&
//       e.code == "P2010" &&
//       e.meta.code == "P0001"
//     ) {
//       // Exemplo de msg: 'db error: ERROR: Empregado não é técnico'
//       throw new Error(e.meta.message.split(": ")[2]);
//     }

//     if (
//       e instanceof Prisma.PrismaClientKnownRequestError &&
//       e.code == "P2010" &&
//       e.meta.code == "23505"
//     ) {
//       // Exemplo de msg: 'db error: ERROR: Empregado não é técnico'
//       throw new Error("Registro já existe.");
//     }
//     throw new Error("Erro ao atualizar empregado. " + e);
//   }
// };

// const Delete = async (id) => {
//   try {
//     await prisma.$queryRaw`Delete from empregado where nro_matricula = ${parseInt(
//       id
//     )}`;
//   } catch (e) {
//     throw new Error("Erro ao deletar empregado. " + e);
//   }
// };

module.exports = { GetAll, GetAllTecnicos, Create, Update, Delete };
