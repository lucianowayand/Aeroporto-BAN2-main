const { Prisma, PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GetAll = async () => {
  try {
    const testes = await prisma.$queryRaw`SELECT * FROM teste`;
    return testes;
  } catch (e) {
    throw new Error("Erro ao retornar teste. " + e);
  }
};

const Create = async (body) => {
  try {
    const teste =
      await prisma.$queryRaw`Insert into teste values (${body.nro_anac}, ${body.nome}, ${body.pont_max})`;
  } catch (e) {

    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code == "P2010" && e.meta.code == "23505"
    ) {
      // Exemplo de msg: 'db error: ERROR: Empregado não é técnico'
      throw new Error("Registro já existe.");
    }
    throw new Error("Erro ao registrar teste. " + e);
  }
};

const Update = async (body, id) => {
  try {
    const teste = await prisma.$queryRaw`Update teste set 
    nro_anac = ${parseInt(body.nro_anac)}, 
    nome = ${body.nome}, 
    pont_max = ${parseInt(body.pont_max)} 
    where nro_anac = ${parseInt(id)}`;
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code == "P2010" && e.meta.code == "23505"
    ) {
      // Exemplo de msg: 'db error: ERROR: Empregado não é técnico'
      throw new Error("Registro já existe.");
    }
    throw new Error("Erro ao atualizar teste. " + e);
  }
};

const Delete = async (id) => {
  try {
    await prisma.$queryRaw`Delete from teste where nro_anac = ${parseInt(id)}`;
  } catch (e) {
    throw new Error("Erro ao deletar teste. " + e);
  }
};

module.exports = { GetAll, Create, Update, Delete };
