const { Prisma, PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GetAll = async () => {
  try {
    const controladoraereo =
      await prisma.$queryRaw`SELECT * FROM controladoraereo`;
    return controladoraereo;
  } catch (e) {
    throw new Error("Erro ao retornar controlador aéreo. " + e);
  }
};

const Create = async (body) => {
  try {
    const controladoraereo =
      await prisma.$queryRaw`Insert into controladoraereo values (${body.nro_matricula}, ${body.data_exame}::timestamp)`;
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code == "P2010" && e.meta.code == "23505"
    ) {
      // Exemplo de msg: 'db error: ERROR: Empregado não é técnico'
      throw new Error("Registro já existe.");
    }
    throw new Error("Erro ao registrar controlador aéreo. " + e);
  }
};

const Update = async (body, id) => {
  try {
    const controladoraereo =
      await prisma.$queryRaw`Update controladoraereo set nro_matricula = ${parseInt(
        body.nro_matricula
      )}, 
    data_exame = ${body.data_exame}::timestamp
    where nro_matricula = ${parseInt(id)}`;
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code == "P2010" && e.meta.code == "23505"
    ) {
      // Exemplo de msg: 'db error: ERROR: Empregado não é técnico'
      throw new Error("Registro já existe.");
    }
    throw new Error("Erro ao atualizar controlador aéreo. " + e);
  }
};

const Delete = async (id) => {
  try {
    await prisma.$queryRaw`Delete from controladoraereo where nro_matricula = ${parseInt(
      id
    )}`;
  } catch (e) {
    throw new Error("Erro ao deletar controlador aéreo. " + e);
  }
};

module.exports = { GetAll, Create, Update, Delete };
