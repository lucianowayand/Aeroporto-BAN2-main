const { Prisma, PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GetAll = async () => {
  try {
    const testes = await prisma.$queryRaw`SELECT * FROM testa`;
    return testes;
  } catch (e) {
    throw new Error("Erro ao retornar registros de testes. " + e);
  }
};

const Create = async (body) => {
  try {
    const teste =
      await prisma.$queryRaw`Insert into testa values (${body.codigo}, ${body.data}::timestamp, ${body.tempo}, ${body.pontuacao}, ${body.nro_anac}, ${body.num_reg}, ${body.nro_tecnico})`;
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code == "P2010" && e.meta.code == "23505"
    ) {
      // Exemplo de msg: 'db error: ERROR: Empregado não é técnico'
      throw new Error("Registro já existe.");
    }
    throw new Error("Erro ao registrar registro de teste. " + e);
  }
};

const Update = async (body, id) => {
  try {
    const teste = await prisma.$queryRaw`Update testa set 
    codigo = ${parseInt(body.codigo)}, 
    data = ${body.data}::timestamp, 
    tempo = ${body.tempo}, 
    pontuacao = ${parseInt(body.pontuacao)},
    nro_anac = ${parseInt(body.nro_anac)},
    num_reg = ${parseInt(body.num_reg)},
    nro_tecnico = ${parseInt(body.nro_tecnico)} 
    where codigo = ${parseInt(id)}`;
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code == "P2010" && e.meta.code == "23505"
    ) {
      // Exemplo de msg: 'db error: ERROR: Empregado não é técnico'
      throw new Error("Registro já existe.");
    }
    throw new Error("Erro ao atualizar registro de teste. " + e);
  }
};

const Delete = async (id) => {
  try {
    await prisma.$queryRaw`Delete from testa where codigo = ${parseInt(id)}`;
  } catch (e) {
    throw new Error("Erro ao deletar registro de teste. " + e);
  }
};

module.exports = { GetAll, Create, Update, Delete };
