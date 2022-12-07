import { useEffect, useRef, useState } from "react";
import Modal from "../../components/modal";
import Warning from "../../components/warning";
import { Create, Delete, GetAll, Update } from "../../services/api";

export default function Testes() {
  const [testes, setTestes] = useState([]);
  const [message, setMessage] = useState({
    text: "",
    error: false,
  });

  const nro_anacCreate = useRef(0);
  const nomeCreate = useRef("");
  const pont_maxCreate = useRef(0);
  const nro_anacUpdate = useRef(0);
  const nomeUpdate = useRef("");
  const pont_maxUpdate = useRef(0);

  const [modal, setModal] = useState(false);
  const [selectedTeste, setSelectedTeste] = useState();

  const GetAllTestes = async () => {
    const res = await GetAll("teste");
    setTestes(res.data.testes);
  };

  const CreateTeste = async () => {
    const res = await Create("teste", {
      nome: nomeCreate.current,
      nro_anac: nro_anacCreate.current,
      pont_max: pont_maxCreate.current,
    });
    if (res.status === 200) {
      setMessage({
        text: "Teste cadastrado com sucesso!",
        error: false,
      });
      GetAllTestes();
    } else {
      setMessage({
        text: res.data.message,
        error: true,
      });
    }
  };

  const UpdateTestes = async () => {
    let payload = {
      nome: nomeUpdate.current,
      nro_anac: nro_anacUpdate.current,
      pont_max: pont_maxUpdate.current,
    };
    console.log(payload);
    const res = await Update("teste", selectedTeste.nro_anac, payload);
    if (res.status === 200) {
      setMessage({
        text: "Teste atualizado com sucesso!",
        error: false,
      });
      GetAllTestes();
    } else {
      console.log(res);
      setMessage({
        text: res.data.message,
        error: true,
      });
    }
    setModal(false);
  };

  const DeleteTestes = async () => {
    const res = await Delete("teste", selectedTeste.nro_anac);
    if (res.status === 200) {
      setMessage({
        text: "Teste deletado com sucesso!",
        error: false,
      });
      GetAllTestes();
    } else {
      console.log(res);
      setMessage({
        text: res.data.message,
        error: true,
      });
    }
    setModal(false);
  };

  const SelectTeste = (value) => {
    setSelectedTeste(value);
    nro_anacUpdate.current = value.nro_anac;
    nomeUpdate.current = value.nome;
    pont_maxUpdate.current = value.pont_max;
    setModal(true);
  };

  useEffect(() => {
    GetAllTestes();
  }, []);

  return (
    <div>
      <Modal
        modal={modal}
        closeModal={() => setModal(false)}
        updateFunction={UpdateTestes}
        deleteFunction={DeleteTestes}
      >
        <div className="pt2 pr1">
          <h5>Número Anac</h5>
          <input
            className="mt0-5 modal-textfield disabled-field"
            defaultValue={selectedTeste ? selectedTeste.nro_anac : 0}
            disabled
          />
        </div>
        <div className="pt2 pr1">
          <h5>Nome</h5>
          <input
            className="mt0-5 modal-textfield"
            onChange={(event) => (nomeUpdate.current = event.target.value)}
            defaultValue={selectedTeste ? selectedTeste.nome : ""}
          />
        </div>
        <div className="pt2 pr1">
          <h5>Pontuação Máxima</h5>
          <input
            className="mt0-5 modal-textfield"
            onChange={(event) =>
              (pont_maxUpdate.current = parseInt(event.target.value))
            }
            defaultValue={selectedTeste ? selectedTeste.pont_max : 0}
          />
        </div>
      </Modal>
      <h1>Testes</h1>
      <Warning message={message} />
      <div className="mt2 border">
        <h3>Adicionar novo registro:</h3>
        <div className="pt1 flex-row-space-between">
          <div className="flex-row">
            <div>
              <h5>Número Anac</h5>
              <input
                className="mt0-5 new-textfield"
                onChange={(event) =>
                  (nro_anacCreate.current = parseInt(event.target.value))
                }
              />
            </div>
            <div className="ml1">
              <h5>Nome</h5>
              <input
                className="mt0-5 new-textfield"
                onChange={(event) => (nomeCreate.current = event.target.value)}
              />
            </div>
            <div className="ml1">
              <h5>Pontuação Máxima</h5>
              <input
                className="mt0-5 new-textfield"
                onChange={(event) =>
                  (pont_maxCreate.current = parseInt(event.target.value))
                }
              />
            </div>
          </div>
          <div className="pl2">
            <button onClick={CreateTeste}>Enviar</button>
          </div>
        </div>
      </div>
      <div className="pt2 flex-center">
        <table>
          <thead>
            <tr>
              <th>Número Anac</th>
              <th>Nome</th>
              <th>Pontuação máxima</th>
            </tr>
          </thead>
          <tbody>
            {testes.length !== 0 ? (
              testes.map((value, i) => (
                <tr
                  key={i}
                  onClick={() => SelectTeste(value)}
                  className="table-row pointer"
                >
                  <td>{value.nro_anac}</td>
                  <td>{value.nome}</td>
                  <td>{value.pont_max}</td>
                </tr>
              ))
            ) : (
              <tr>
                <p className="p1">Não existem testes cadastrados :(</p>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
