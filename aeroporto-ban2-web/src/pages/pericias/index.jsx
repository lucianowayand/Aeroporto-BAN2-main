import { useEffect, useRef, useState } from "react";
import Modal from "../../components/modal";
import Warning from "../../components/warning";
import { Create, Delete, GetAll, Update } from "../../services/api";

export default function Pericia() {
  const [pericias, setPericia] = useState([]);
  const [message, setMessage] = useState({
    text: "",
    error: false,
  });

  const nro_matriculaCreate = useRef(0);
  const codigo_modeloCreate = useRef("");
  const nro_matriculaUpdate = useRef(0);
  const codigo_modeloUpdate = useRef("");

  const [modal, setModal] = useState(false);
  const [selectedPericia, setSelectedPericia] = useState();

  const [matriculas, setMatriculas] = useState([]);
  const GetAllEmpregados = async () => {
    const res = await GetAll("empregado");
    setMatriculas(res.data.empregados);
  };

  const [modelos, setModelos] = useState([]);
  const GetAllModelos = async () => {
    const res = await GetAll("modelo");
    setModelos(res.data.modelos);
  };

  const GetAllPericia = async () => {
    const res = await GetAll("pericia");
    setPericia(res.data.pericias);
  };

  const CreatePericia = async () => {
    console.log({
      nro_matricula: nro_matriculaCreate.current,
      codigo_modelo: codigo_modeloCreate.current,
    });
    const res = await Create("pericia", {
      nro_matricula: nro_matriculaCreate.current,
      codigo_modelo: codigo_modeloCreate.current,
    });
    if (res.status === 200) {
      setMessage({
        text: "Pericia cadastrada com sucesso!",
        error: false,
      });
      GetAllPericia();
    } else {
      setMessage({
        text: res.data.message,
        error: true,
      });
    }
  };

  const UpdatePericia = async () => {
    let payload = {
      nro_matricula: nro_matriculaUpdate.current,
      codigo_modelo: codigo_modeloUpdate.current,
    };
    console.log(payload);
    const res = await Update("pericia", selectedPericia.nro_matricula, payload);
    if (res.status === 200) {
      setMessage({
        text: "Pericia atualizada com sucesso!",
        error: false,
      });
      GetAllPericia();
    } else {
      console.log(res);
      setMessage({
        text: res.data.message,
        error: true,
      });
    }
    setModal(false);
  };

  const DeletePericia = async () => {
    const res = await Delete("pericia", selectedPericia.nro_matricula);
    if (res.status === 200) {
      setMessage({
        text: "Pericia deletada com sucesso!",
        error: false,
      });
      GetAllPericia();
    } else {
      console.log(res);
      setMessage({
        text: res.data.message,
        error: true,
      });
    }
    setModal(false);
  };

  const SelectPericia = (value) => {
    setSelectedPericia(value);
    nro_matriculaUpdate.current = value.nro_matricula;
    codigo_modeloUpdate.current = value.codigo_modelo;
    setModal(true);
  };

  useEffect(() => {
    GetAllPericia();
    GetAllEmpregados();
    GetAllModelos();
  }, []);

  return (
    <div>
      <Modal
        modal={modal}
        closeModal={() => setModal(false)}
        updateFunction={UpdatePericia}
        deleteFunction={DeletePericia}
      >
        <div className="pt2 pr1">
          <h5>Número de Matrícula</h5>
          <input
            className="mt0-5 modal-textfield disabled-field"
            defaultValue={selectedPericia ? selectedPericia.nro_matricula : 0}
            disabled
          />
        </div>
        <div className="pt2 pr1">
          <h5>Código do Modelo</h5>
          {modelos.length !== 0 ? (
            <select
              className="mt0-5 new-textfield"
              defaultValue={
                selectedPericia ? selectedPericia.codigo_modelo : ""
              }
              onChange={(event) =>
                (codigo_modeloUpdate.current = event.target.value)
              }
            >
              {modelos.map((element, i) => (
                <option key={i} value={element.codigo}>
                  {element.codigo}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="mt0-5 new-textfield  disabled-field"
              disabled
              onChange={(event) =>
                (data_exameUpdate.current = event.target.value)
              }
            />
          )}
        </div>
      </Modal>
      <h1>Perícia</h1>
      <Warning message={message} />
      <div className="mt2 border">
        <h3>Adicionar novo registro:</h3>
        <div className="pt1 flex-row-space-between">
          <div className="flex-row">
            <div>
              <h5>Número de Matricula</h5>
              {matriculas.length !== 0 ? (
                <select
                  className="mt0-5 new-textfield"
                  onChange={(event) =>
                    (nro_matriculaCreate.current = parseInt(event.target.value))
                  }
                >
                  <option key={0} value={0}>
                    {"Selecione .."}
                  </option>
                  {matriculas.map((element, i) => (
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
                    (data_exameCreate.current = event.target.value)
                  }
                />
              )}
            </div>
            <div className="ml1">
              <h5>Código do Modelo</h5>
              {modelos.length !== 0 ? (
                <select
                  className="mt0-5 new-textfield"
                  onChange={(event) =>
                    (codigo_modeloCreate.current = event.target.value)
                  }
                >
                  <option key={0} value={0}>
                    {"Selecione .."}
                  </option>
                  {modelos.map((element, i) => (
                    <option key={i + 1} value={element.codigo}>
                      {element.codigo}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="mt0-5 new-textfield  disabled-field"
                  disabled
                  onChange={(event) =>
                    (data_exameCreate.current = event.target.value)
                  }
                />
              )}
            </div>
          </div>
          <div className="pl2">
            <button onClick={CreatePericia}>Enviar</button>
          </div>
        </div>
      </div>
      <div className="pt2 flex-center">
        <table>
          <thead>
            <tr>
              <th>Número Matrícula</th>
              <th>Código do Modelo</th>
            </tr>
          </thead>
          <tbody>
            {pericias.length !== 0 ? (
              pericias.map((value, i) => (
                <tr
                  key={i}
                  onClick={() => SelectPericia(value)}
                  className="table-row pointer"
                >
                  <td>{value.nro_matricula}</td>
                  <td>{value.codigo_modelo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <p className="p1">Não existem pericias cadastrados :(</p>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
