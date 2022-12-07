const { Prisma, PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const mongo = require('./mongo')

const GetAll = async () => {
  GetMongo()
  try {
    const modelo = await prisma.$queryRaw`SELECT * FROM modelo`;
    return modelo;
  } catch (e) {
    throw new Error("Erro ao retornar modelo. " + e);
  }
};

const Create = async (body) => {
  try {
    const modelo =
      await prisma.$queryRaw`Insert into modelo values (${body.codigo}, ${body.capacidade}, ${body.peso})`;
  } catch (e) {

    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code == "P2010" && e.meta.code == "23505"
    ) {
      // Exemplo de msg: 'db error: ERROR: Empregado não é técnico'
      throw new Error("Registro já existe.");
    }
    throw new Error("Erro ao registrar modelo. " + e);
  }
};

const Update = async (body, id) => {
  try {
    const modelo = await prisma.$queryRaw`Update modelo set 
    codigo = ${body.codigo}, 
    capacidade = ${parseInt(body.capacidade)}, 
    peso = ${parseInt(body.peso)} 
    where codigo = ${id}`;
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code == "P2010" && e.meta.code == "23505"
    ) {
      // Exemplo de msg: 'db error: ERROR: Empregado não é técnico'
      throw new Error("Registro já existe.");
    }
    throw new Error("Erro ao atualizar modelo. " + e);
  }
};

const Delete = async (id) => {
  try {
    await prisma.$queryRaw`Delete from modelo where codigo = ${id}`;
  } catch (e) {
    throw new Error("Erro ao deletar modelo. " + e);
  }
};

module.exports = { GetAll, Create, Update, Delete };
