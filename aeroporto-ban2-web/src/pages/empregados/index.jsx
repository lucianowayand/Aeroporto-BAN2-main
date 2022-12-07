import { useEffect, useRef, useState } from "react"
import { Create, Delete, GetAll, Update } from "../../services/api"
import Modal from "../../components/modal"
import Warning from "../../components/warning"

export default function Empregados() {
    const [empregados, setEmpregados] = useState([])
    const [message, setMessage] = useState({
        text: "",
        error: false,
    })

    const nro_matriculaCreate = useRef(0)
    const enderecoCreate = useRef("")
    const telefoneCreate = useRef("")
    const salarioCreate = useRef(0)
    const nro_sindicatoCreate = useRef(0)
    const [tecnicoCreate, setTecnicoCreate] = useState(false)

    const nro_matriculaUpdate = useRef(0)
    const enderecoUpdate = useRef("")
    const telefoneUpdate = useRef("")
    const salarioUpdate = useRef(0)
    const nro_sindicatoUpdate = useRef(0)
    const [tecnicoUpdate, setTecnicoUpdate] = useState(false)


    const [modal, setModal] = useState(false)
    const [selectedEmpregado, setSelectedEmpregado] = useState()

    const GetAllEmpregados = async () => {
        const res = await GetAll('empregado')
        setEmpregados(res.data.empregados)
    }

    const CreateEmpregados = async () => {
        const payload = {
            nro_matricula: nro_matriculaCreate.current,
            endereco: enderecoCreate.current,
            telefone: telefoneCreate.current,
            salario: salarioCreate.current,
            nro_sindicato: nro_sindicatoCreate.current,
            tecnico: tecnicoCreate
        }
        console.log(payload)
        const res = await Create('empregado', payload)
        if (res.status === 200) {
            setMessage({
                text: "Empregado cadastrado com sucesso!",
                error: false
            })
            GetAllEmpregados()
        } else {
            setMessage({
                text: res.data.message,
                error: true
            })
        }
    }

    const UpdateEmpregados = async () => {
        let payload = {
            nro_matricula: nro_matriculaUpdate.current,
            endereco: enderecoUpdate.current,
            telefone: telefoneUpdate.current,
            salario: salarioUpdate.current,
            nro_sindicato: nro_sindicatoUpdate.current,
            tecnico: tecnicoUpdate
        }
        console.log(payload)
        const res = await Update('empregado', selectedEmpregado.nro_matricula, payload)
        if (res.status === 200) {
            setMessage({
                text: "Empregado atualizado com sucesso!",
                error: false
            })
            GetAllEmpregados()
        } else {
            console.log(res)
            setMessage({
                text: res.data.message,
                error: true
            })
        }
        setModal(false)
    }

    const DeleteEmpregados = async () => {
        const res = await Delete('empregado', selectedEmpregado.nro_matricula)
        if (res.status === 200) {
            setMessage({
                text: "Empregado deletado com sucesso!",
                error: false
            })
            GetAllEmpregados()
        } else {
            console.log(res)
            setMessage({
                text: res.data.message,
                error: true
            })
        }
        setModal(false)
    }

    const SelectEmpregado = (value) => {
        setSelectedEmpregado(value)
        nro_matriculaUpdate.current = value.nro_matricula
        enderecoUpdate.current = value.endereco
        telefoneUpdate.current = value.telefone
        salarioUpdate.current = value.salario
        nro_sindicatoUpdate.current = value.nro_sindicato
        setTecnicoUpdate(value.tecnico)
        setModal(true)
    }

    useEffect(() => {
        GetAllEmpregados()
    }, [])

    return (
        <div>
            <Modal modal={modal} closeModal={() => setModal(false)} updateFunction={UpdateEmpregados} deleteFunction={DeleteEmpregados}>
                <div className="flex-row-space-around">
                    <div>
                        <div className="pt2 pr1">
                            <h5>Matrícula</h5>
                            <input
                                className="mt0-5 modal-textfield"
                                defaultValue={(selectedEmpregado ? selectedEmpregado.nro_matricula : "")}
                                onChange={(event) => nro_matriculaUpdate.current = parseInt(event.target.value)}
                            />
                        </div>
                        <div className="pt2 pr1">
                            <h5>Telefone</h5>
                            <input
                                className="mt0-5 modal-textfield"
                                defaultValue={(selectedEmpregado ? selectedEmpregado.telefone : "")}
                                onChange={(event) => telefoneUpdate.current = parseInt(event.target.value)}

                            />
                        </div>
                        <div className="pt2 pr1">
                            <h5>Nr. Sindicato</h5>
                            <input
                                className="mt0-5 modal-textfield"
                                defaultValue={(selectedEmpregado ? selectedEmpregado.nro_sindicato : "")}
                                onChange={(event) => nro_sindicatoUpdate.current = parseInt(event.target.value)}

                            />
                        </div>
                    </div>
                    <div>
                        <div className="pt2 pr1">
                            <h5>Endereço</h5>
                            <input
                                className="mt0-5 modal-textfield"
                                defaultValue={(selectedEmpregado ? selectedEmpregado.endereco : "")}
                                onChange={(event) => enderecoUpdate.current = parseInt(event.target.value)}

                            />
                        </div>
                        <div className="pt2 pr1">
                            <h5>Salário</h5>
                            <input
                                className="mt0-5 modal-textfield"
                                defaultValue={(selectedEmpregado ? selectedEmpregado.salario : "")}
                                onChange={(event) => salarioUpdate.current = parseInt(event.target.value)}

                            />
                        </div>
                        <div className="pt2 pr1">
                            <div className="ml1 flex-column-center border register-checkbox">
                                <input type="checkbox" name="tecnico" defaultChecked={tecnicoUpdate} onClick={() => setTecnicoUpdate(!tecnicoUpdate)} />
                                <label for="tecnico" className="pl0-5">Técnico</label>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <h1>Empregados</h1>
            <Warning message={message} />
            <div className="mt2 border">
                <h3>Adicionar novo registro:</h3>
                <div className="pt1 flex-row-space-between">
                    <div className="flex-row">
                        <div className="">
                            <h5>Matrícula</h5>
                            <input className="mt0-5 new-textfield register-field" onChange={(event) => nro_matriculaCreate.current = parseInt(event.target.value)} />
                        </div>
                        <div className="ml1">
                            <h5>Endereço</h5>
                            <input className="mt0-5 new-textfield register-field" onChange={(event) => enderecoCreate.current = event.target.value} />
                        </div>
                        <div className="ml1">
                            <h5>Telefone</h5>
                            <input className="mt0-5 new-textfield register-field" onChange={(event) => telefoneCreate.current = event.target.value} />
                        </div>
                        <div className="ml1">
                            <h5>Salário</h5>
                            <input className="mt0-5 new-textfield register-field" onChange={(event) => salarioCreate.current = parseFloat(event.target.value)} />
                        </div>
                        <div className="ml1">
                            <h5>Nr. Sindicato</h5>
                            <input className="mt0-5 new-textfield register-field" onChange={(event) => nro_sindicatoCreate.current = parseInt(event.target.value)} />
                        </div>
                        <div className="ml1 flex-column-center border register-checkbox">
                            <input type="checkbox" name="tecnico" defaultChecked={tecnicoCreate} onClick={() => setTecnicoCreate(!tecnicoCreate)} />
                            <label for="tecnico" className="pl0-5">Técnico</label>
                        </div>
                    </div>
                    <div className="pl2">
                        <button onClick={CreateEmpregados}>Enviar</button>
                    </div>
                </div>
            </div>
            <div className="pt2 flex-center">
                <table>
                    <thead>
                        <tr>
                            <th>Matrícula</th>
                            <th>Endereço</th>
                            <th>Telefone</th>
                            <th>Salário</th>
                            <th>Nr. Sindicato</th>
                            <th>Técnico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empregados.length !== 0 ? empregados.map((value, i) => (
                            <tr key={i} onClick={() => SelectEmpregado(value)} className="table-row pointer">
                                <td>{value.nro_matricula}</td>
                                <td>{value.endereco}</td>
                                <td>{value.telefone}</td>
                                <td>{value.salario}</td>
                                <td>{value.nro_sindicato}</td>
                                <td>{value.tecnico ? "Sim" : "Não"}</td>
                            </tr>
                        )) :
                            <tr>
                                <p className="p1">Não existem empregados cadastrados :(</p>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}