CREATE TABLE teste (
	nro_ANAC int PRIMARY KEY,
	nome varchar[255] NOT NULL,
	pont_max int NOT NULL
);

CREATE TABLE Modelo (
	codigo int PRIMARY KEY,
	capacidade int NOT NULL,
	peso int NOT NULL
);

CREATE TABLE Aviao (
	num_reg int PRIMARY KEY,
	codigo_modelo int NOT NULL,
	CONSTRAINT mecanico_cods_fkey FOREIGN KEY (codigo_modelo)
	REFERENCES Modelo (codigo) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE Empregado (
	nro_matricula int PRIMARY KEY,
	endereco varchar[255] NOT NULL,
	telefone varchar[20] NOT NULL,
	salario float NOT NULL,
	nro_sindicato int NOT NULL,
	tecnico boolean default(false) NOT NULL
);

CREATE TABLE ControladorAereo (
	nro_matricula int PRIMARY KEY,
	data_exame date NOT NULL,
	CONSTRAINT controlador_matricula_fkey FOREIGN KEY (nro_matricula)
	REFERENCES Empregado (nro_matricula) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE Modelo_has_Tecnico (
	nro_matricula int,
	codigo_modelo int,
	CONSTRAINT modelo_has_tecnico_pkey PRIMARY KEY (nro_matricula, codigo_modelo),
	CONSTRAINT controlador_matricula_fkey FOREIGN KEY (nro_matricula)
	REFERENCES Empregado (nro_matricula) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE SET NULL,
	CONSTRAINT codigo_modelo_fkey FOREIGN KEY (codigo_modelo)
	REFERENCES Modelo (codigo) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE Testa (
	codigo int PRIMARY KEY,
	data date NOT NULL,
	tempo time without time zone NOT NULL,
	pontuacao int NOT NULL,
	nro_ANAC int NOT NULL,
	num_reg int NOT NULL,
	nro_tecnico int NOT NULL,
	CONSTRAINT numero_anac_fkey FOREIGN KEY (nro_ANAC)
	REFERENCES Teste (nro_ANAC) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE SET NULL,
	CONSTRAINT numero_aviao_fkey FOREIGN KEY (num_reg)
	REFERENCES Aviao (num_reg) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE SET NULL,
	CONSTRAINT numero_tecnico_fkey FOREIGN KEY (nro_tecnico)
	REFERENCES Empregado (nro_matricula) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE SET NULL
);

create or replace function verificaTecnico() returns trigger as
$$
declare ehTecnico boolean;
begin
   select tecnico into ehTecnico from empregado where nro_matricula=new.nro_matricula;
   if ehTecnico=false then
      raise exception 'Empregado não é técnico';
   end if;
   return new;
end;
$$
language plpgsql;

create trigger verificaTecnico before insert or update on modelo_has_tecnico
 for each row execute procedure verificaTecnico();

create or replace function verificaTeste() returns trigger as
$$
declare ehTecnico boolean;
begin
   select tecnico into ehTecnico from empregado where nro_matricula=new.nro_tecnico;
   if ehTecnico=false then
      raise exception 'Empregado não é técnico';
   end if;
   return new;
end;
$$
language plpgsql;

create trigger verificaTeste before insert or update on testa
 for each row execute procedure verificaTeste();
 
 create or replace function verificaModeloDoAviaoTestado() returns trigger as
$$
declare modelo int;
declare modeloTecnico int;
begin
   Select count(codigo_modelo) into modelo from testa T join aviao A on A.num_reg = T.num_reg join modelo_has_tecnico M on nro_matricula=nro_tecnico where M.codigo_modelo=A.codigo_modelo;
   if modeloTecnico<1 then
      raise exception 'Técnico não é perito nesse avião';
   end if;
   return new;
end;
$$
language plpgsql;

create trigger verificaModeloDoAviaoTestado before insert or update on testa
 for each row execute procedure verificaModeloDoAviaoTestado();
 
 create or replace function verificaEmpregadoTecnico() returns trigger as
$$
declare contModelos int;
declare contTestes int;
begin
   if old.tecnico and new.tecnico = false then
   	  select count(*) into contModelos from modelo_has_tecnico where new.nro_matricula=nro_matricula;
   	  select count(*) into contTestes from testa where new.nro_tecnico=nro_matricula;
	  if contModelos+contTestes>0 then
      	raise exception 'Empregado possui perícia ou testes e não pode perder propriedade de técnico';
	  end if;	
   end if;
   return new;
end;
$$
language plpgsql;

create trigger verificaEmpregadoTecnico before update on empregado
 for each row execute procedure verificaEmpregadoTecnico();
