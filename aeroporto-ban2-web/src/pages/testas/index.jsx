import { useEffect, useRef, useState } from "react";
import { Create, Delete, GetAll, Update } from "../../services/api";
import Modal from "../../components/modal";
import Warning from "../../components/warning";

export default function Testas() {
  const [testas, setTestas] = useState([]);
  const [message, setMessage] = useState({
    text: "",
    error: false,
  });

  const codigoCreate = useRef(0);
  const dataCreate = useRef("");
  const tempoCreate = useRef("");
  const pontuacaoCreate = useRef(0);
  const nro_anacCreate = useRef(0);
  const num_regCreate = useRef(0);
  const nro_tecnicoCreate = useRef(0);

  const codigoUpdate = useRef(0);
  const dataUpdate = useRef("");
  const tempoUpdate = useRef("");
  const pontuacaoUpdate = useRef(0);
  const nro_anacUpdate = useRef(0);
  const num_regUpdate = useRef(0);
  const nro_tecnicoUpdate = useRef(0);

  const [modal, setModal] = useState(false);
  const [selectedTesta, setSelectedTesta] = useState();

  const [testes, setTestes] = useState([]);
  const GetAllTestes = async () => {
    const res = await GetAll("teste");
    setTestes(res.data.testes);
  };

  const [avioes, setAvioes] = useState([]);
  const GetAllAvioes = async () => {
    const res = await GetAll("aviao");
    setAvioes(res.data.avioes);
  };

  const [tecnicos, setTecnicos] = useState([]);
  const GetAllTecnicos = async () => {
    const res = await GetAll("empregado/tecnico");
    console.log(res);
    setTecnicos(res.data.empregados);
  };

  const GetAllTestas = async () => {
    const res = await GetAll("testa");
    setTestas(res.data.testas);
  };

  const CreateTestas = async () => {
    const payload = {
      codigo: codigoCreate.current,
      data: dataCreate.current,
      tempo: tempoCreate.current,
      pontuacao: pontuacaoCreate.current,
      nro_anac: nro_anacCreate.current,
      num_reg: num_regCreate.current,
      nro_tecnico: nro_tecnicoCreate.current,
    };
    console.log(payload);
    const res = await Create("testa", payload);
    if (res.status === 200) {
      setMessage({
        text: res.data.message,
        error: false,
      });
      GetAllTestas();
    } else {
      setMessage({
        text: res.data.message,
        error: true,
      });
    }
  };

  const UpdateTestas = async () => {
    let payload = {
      codigo: codigoUpdate.current,
      data: dataUpdate.current,
      tempo: tempoUpdate.current,
      pontuacao: pontuacaoUpdate.current,
      nro_anac: nro_anacUpdate.current,
      num_reg: num_regUpdate.current,
      nro_tecnico: nro_tecnicoUpdate.current,
    };
    console.log(payload);
    const res = await Update("testa", selectedTesta.codigo, payload);
    if (res.status === 200) {
      setMessage({
        text: res.data.message,
        error: false,
      });
      GetAllTestas();
    } else {
      console.log(res);
      setMessage({
        text: res.data.message,
        error: true,
      });
    }
    setModal(false);
  };

  const DeleteTestas = async () => {
    const res = await Delete("testa", selectedTesta.codigo);
    if (res.status === 200) {
      setMessage({
        text: res.data.message,
        error: false,
      });
      GetAllTestas();
    } else {
      console.log(res);
      setMessage({
        text: res.data.message,
        error: true,
      });
    }
    setModal(false);
  };

  const SelectTesta = (value) => {
    setSelectedTesta(value);
    codigoUpdate.current = value.codigo;
    dataUpdate.current = value.data;
    tempoUpdate.current = value.tempo;
    pontuacaoUpdate.current = value.pontuacao;
    nro_anacUpdate.current = value.nro_anac;
    num_regUpdate.current = value.num_reg;
    nro_tecnicoUpdate.current = value.nro_tecnico;
    setModal(true);
  };

  useEffect(() => {
    GetAllTestas();
    GetAllTestes();
    GetAllAvioes();
    GetAllTecnicos();
  }, []);

  return (
    <div>
      <Modal
        modal={modal}
        closeModal={() => setModal(false)}
        updateFunction={UpdateTestas}
        deleteFunction={DeleteTestas}
      >
        <div className="flex-row-space-around">
          <div>
            <div className="pt2 pr1">
              <h5>Código</h5>
              <input
                className="mt0-5 modal-textfield"
                defaultValue={selectedTesta ? selectedTesta.codigo : ""}
                onChange={(event) =>
                  (codigoUpdate.current = parseInt(event.target.value))
                }
              />
            </div>
            <div className="pt2 pr1">
              <h5>Tempo</h5>
              <input
                className="mt0-5 modal-textfield"
                defaultValue={selectedTesta ? selectedTesta.tempo : ""}
                onChange={(event) =>
                  (tempoUpdate.current = event.target.value)
                }
              />
            </div>
            <div className="pt2 pr1">
              <h5>Nr. Anac</h5>
              <input
                className="mt0-5 modal-textfield"
                defaultValue={selectedTesta ? selectedTesta.nro_anac : ""}
                onChange={(event) =>
                  (nro_anacUpdate.current = parseInt(event.target.value))
                }
              />
            </div>
          </div>
          <div>
            <div className="pt2 pr1">
              <h5>Data</h5>
              <input
                className="mt0-5 modal-textfield"
                defaultValue={selectedTesta ? selectedTesta.data.slice(0, 4) +
                  "-" +
                  selectedTesta.data.slice(5, 7) +
                  "-" +
                  selectedTesta.data.slice(8, 10) : ""}
                onChange={(event) =>
                  (dataUpdate.current = event.target.value)
                }
              />
            </div>
            <div className="pt2 pr1">
              <h5>Pontuação</h5>
              <input
                className="mt0-5 modal-textfield"
                defaultValue={selectedTesta ? selectedTesta.pontuacao : ""}
                onChange={(event) =>
                  (pontuacaoUpdate.current = parseInt(event.target.value))
                }
              />
            </div>
            <div className="pt2 pr1">
              <h5>Nr. Técnico</h5>
              <input
                className="mt0-5 modal-textfield disabled-field"
                defaultValue={selectedTesta ? selectedTesta.nro_tecnico : ""}
                onChange={(event) =>
                  (pontuacaoUpdate.current = parseInt(event.target.value))
                }
                disabled
              />
            </div>
          </div>
        </div>
      </Modal>
      <h1>Registro de Testes</h1>
      <Warning message={message} />
      <div className="mt2 border">
        <h3>Adicionar novo registro:</h3>
        <div className="pt1 flex-row-space-between">
          <div className="flex-row">
            <div className="">
              <h5>Código</h5>
              <input
                className="mt0-5 new-textfield register-field"
                onChange={(event) =>
                  (codigoCreate.current = parseInt(event.target.value))
                }
              />
            </div>
            <div className="ml1">
              <h5>Data</h5>
              <input
                type="date"
                className="mt0-5 new-textfield"
                onChange={(event) => (dataCreate.current = event.target.value)}
              />
            </div>
            <div className="ml1">
              <h5>Tempo</h5>
              <input
                className="mt0-5 new-textfield register-field"
                onChange={(event) => (tempoCreate.current = event.target.value)}
              />
            </div>
            <div className="ml1">
              <h5>Pontuação</h5>
              <input
                className="mt0-5 new-textfield register-field"
                onChange={(event) =>
                  (pontuacaoCreate.current = parseInt(event.target.value))
                }
              />
            </div>
            <div className="ml1">
              <h5>Nr. Anac</h5>
              {testes.length !== 0 ? (
                <select
                  className="mt0-5 new-textfield"
                  onChange={(event) =>
                    (nro_anacCreate.current = parseInt(event.target.value))
                  }
                >
                  <option key={0} value={0}>
                    {"Selecione .."}
                  </option>
                  {testes.map((element, i) => (
                    <option key={i + 1} value={parseInt(element.nro_anac)}>
                      {element.nro_anac}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="mt0-5 new-textfield  disabled-field"
                  disabled
                  onChange={(event) =>
                    (nro_anacCreate.current = parseInt(event.target.value))
                  }
                />
              )}
            </div>
            <div className="ml1">
              <h5>Avião</h5>
              {avioes.length !== 0 ? (
                <select
                  className="mt0-5 new-textfield"
                  defaultValue={selectedTesta ? selectedTesta.num_reg : 0}
                  onChange={(event) =>
                    (num_regCreate.current = parseInt(event.target.value))
                  }
                >
                  <option key={0} value={0}>
                    {"Selecione .."}
                  </option>
                  {avioes.map((element, i) => (
                    <option key={i + 1} value={parseInt(element.num_reg)}>
                      {element.num_reg}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="mt0-5 new-textfield  disabled-field"
                  disabled
                  onChange={(event) =>
                    (num_regCreate.current = parseInt(event.target.value))
                  }
                />
              )}
            </div>
            <div className="ml1">
              <h5>Técnico</h5>
              {tecnicos.length !== 0 ? (
                <select
                  className="mt0-5 new-textfield"
                  defaultValue={selectedTesta ? selectedTesta.nro_tecnico : 0}
                  onChange={(event) =>
                    (nro_tecnicoCreate.current = parseInt(event.target.value))
                  }
                >
                  <option key={0} value={0}>
                    {"Selecione .."}
                  </option>
                  {tecnicos.map((element, i) => (
                    <option key={i + 1} value={parseInt(element.nro_matricula)}>
                      {element.nro_matricula}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="mt0-5 new-textfield  disabled-field"
                  disabled
                  onChange={(event) =>
                    (nro_tecnicoCreate.current = parseInt(event.target.value))
                  }
                />
              )}
            </div>
          </div>
          <div className="pl2">
            <button onClick={CreateTestas}>Enviar</button>
          </div>
        </div>
      </div>
      <div className="pt2 flex-center">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Data</th>
              <th>Tempo</th>
              <th>Pontuação</th>
              <th>Nr. Anac</th>
              <th>Nr. Reg Avião</th>
              <th>Nr. Tecnico</th>
            </tr>
          </thead>
          <tbody>
            {testas.length !== 0 ? (
              testas.map((value, i) => (
                <tr
                  key={i}
                  onClick={() => SelectTesta(value)}
                  className="table-row pointer"
                >
                  <td>{value.codigo}</td>
                  <td>
                    {value.data.slice(5, 7) +
                      "-" +
                      value.data.slice(8, 10) +
                      "-" +
                      value.data.slice(0, 4)}
                  </td>
                  <td>{value.tempo}</td>
                  <td>{value.pontuacao}</td>
                  <td>{value.nro_anac}</td>
                  <td>{value.num_reg}</td>
                  <td>{value.nro_tecnico}</td>
                </tr>
              ))
            ) : (
              <tr>
                <p className="p1">
                  Não existe registro de testes cadastrados :(
                </p>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
