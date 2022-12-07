const { Prisma, PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GetAll = async () => {
  try {
    const modelo = await prisma.$queryRaw`SELECT * FROM modelo_has_tecnico`;
    return modelo;
  } catch (e) {
    throw new Error("Erro ao retornar perícias . " + e);
  }
};

const Create = async (body) => {
  try {
    const modelo =
      await prisma.$queryRaw`Insert into modelo_has_tecnico values (${body.nro_matricula}, ${body.codigo_modelo})`;
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code == "P2010" && e.meta.code == "P0001"
    ) {
      // Exemplo de msg: 'db error: ERROR: Empregado não é técnico'
      throw new Error(e.meta.message.split(": ")[2]);
    }
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code == "P2010" && e.meta.code == "23505"
    ) {
      // Exemplo de msg: 'db error: ERROR: Empregado não é técnico'
      throw new Error("Registro já existe.");
    }
    throw new Error("Erro ao registrar perícia. " + e);
  }
};

const Update = async (body, id) => {
  try {
    const modelo = await prisma.$queryRaw`Update modelo_has_tecnico set 
    nro_matricula = ${parseInt(body.nro_matricula)}, 
    codigo_modelo = ${body.codigo_modelo}
    where nro_matricula = ${parseInt(id)}`;
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code == "P2010" && e.meta.code == "P0001"
    ) {
      // Exemplo de msg: 'db error: ERROR: Empregado não é técnico'
      throw new Error(e.meta.message.split(": ")[2]);
    }
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code == "P2010" && e.meta.code == "23505"
    ) {
      // Exemplo de msg: 'db error: ERROR: Empregado não é técnico'
      throw new Error("Registro já existe.");
    }
    throw new Error("Erro ao atualizar perícia. " + e);
  }
};

const Delete = async (id) => {
  try {
    await prisma.$queryRaw`Delete from modelo_has_tecnico where nro_matricula = ${parseInt(
      id
    )}`;
  } catch (e) {
    throw new Error("Erro ao deletar perícia. " + e);
  }
};

module.exports = { GetAll, Create, Update, Delete };
