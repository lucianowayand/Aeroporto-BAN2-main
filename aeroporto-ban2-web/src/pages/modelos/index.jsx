import { useEffect, useRef, useState } from "react"
import { Create, Delete, GetAll, Update } from "../../services/api"
import Warning from "../../components/warning"
import Modal from "../../components/modal"

export default function Modelos() {
    const [modelos, setModelos] = useState([])
    const [message, setMessage] = useState({
        text: "",
        error: false,
    })

    const codigoCreate = useRef("")
    const capacidadeCreate = useRef(0)
    const pesoCreate = useRef(0)

    const codigoUpdate = useRef("")
    const capacidadeUpdate = useRef(0)
    const pesoUpdate = useRef(0)

    const [modal, setModal] = useState(false)
    const [selectedModelo, setSelectedModelo] = useState()

    const GetAllModelos = async () => {
        const res = await GetAll('modelo')
        console.log(res)
        setModelos(res.data.modelos)
    }

    const CreateModelo = async () => {
        const res = await Create('modelo', {
            codigo: codigoCreate.current,
            capacidade: capacidadeCreate.current,
            peso: pesoCreate.current
        })
        if (res.status === 200) {
            setMessage({
                text: "Modelo cadastrado com sucesso!",
                error: false
            })
            GetAllModelos()
        } else {
            setMessage({
                text: res.data.message,
                error: true
            })
        }
    }

    const UpdateModelo = async () => {
        let payload = {
            capacidade: parseInt(capacidadeUpdate.current),
            peso: parseInt(pesoUpdate.current)
        }

        const res = await Update('modelo', selectedModelo._id, payload)
        if (res.status === 200) {
            setMessage({
                text: "Modelo atualizado com sucesso!",
                error: false
            })
            GetAllModelos()
        } else {
            console.log(res)
            setMessage({
                text: res.data.message,
                error: true
            })
        }
        setModal(false)
    }

    const DeleteModelos = async () => {
        const res = await Delete('modelo', selectedModelo._id)
        if (res.status === 200) {
            setMessage({
                text: "Modelo deletado com sucesso!",
                error: false
            })
            GetAllModelos()
        } else {
            console.log(res)
            setMessage({
                text: res.data.message,
                error: true
            })
        }
        setModal(false)
    }

    const SelectModelo = (value) => {
        setSelectedModelo(value)
        codigoUpdate.current = value.codigo
        capacidadeUpdate.current = value.capacidade
        pesoUpdate.current = value.peso
        setModal(true)
    }

    useEffect(() => {
        GetAllModelos()
    }, [])

    useEffect(() => {
        console.log(modelos)
    }, [modelos])

    return (
        <div>
            <Modal modal={modal} closeModal={() => setModal(false)} updateFunction={UpdateModelo} deleteFunction={DeleteModelos}>
                <div className="pt2 pr1">
                    <h5>Código</h5>
                    <input
                        className="mt0-5 modal-textfield disabled-field"
                        disabled
                        onChange={(event) => codigoUpdate.current = event.target.value}
                        defaultValue={(selectedModelo ? selectedModelo._id : "")}
                    />
                </div>
                <div className="pt2 pr1">
                    <h5>Capacidade</h5>
                    <input
                        className="mt0-5 modal-textfield"
                        onChange={(event) => capacidadeUpdate.current = event.target.value}
                        defaultValue={(selectedModelo ? selectedModelo.capacidade : "")}
                    />
                </div>
                <div className="pt2 pr1">
                    <h5>Peso</h5>
                    <input
                        className="mt0-5 modal-textfield"
                        onChange={(event) => pesoUpdate.current = event.target.value}
                        defaultValue={(selectedModelo ? selectedModelo.peso : "")}
                    />
                </div>
            </Modal>
            <h1>Modelos</h1>
            <Warning message={message} />
            <div className="mt2 border">
                <h3>Adicionar novo registro:</h3>
                <div className="pt1 flex-row-space-between">
                    <div className="flex-row">
                        <div>
                            <h5>Código</h5>
                            <input className="mt0-5 new-textfield register-field" onChange={(event) => codigoCreate.current = event.target.value} />
                        </div>
                        <div className="ml1">
                            <h5>Capacidade</h5>
                            <input className="mt0-5 new-textfield register-field" onChange={(event) => capacidadeCreate.current = parseInt(event.target.value)} />
                        </div>
                        <div className="ml1">
                            <h5>Peso</h5>
                            <input className="mt0-5 new-textfield register-field" onChange={(event) => pesoCreate.current = parseInt(event.target.value)} />
                        </div>
                    </div>
                    <div className="pl2">
                        <button onClick={CreateModelo}>Enviar</button>
                    </div>
                </div>
            </div>
            <div className="pt2 flex-center">
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Capacidade (tons)</th>
                            <th>Peso (tons)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modelos.length !== 0  ? modelos.map((value, i) => (
                            <tr key={i} onClick={() => SelectModelo(value)} className="table-row pointer">
                                <td>{value._id}</td>
                                <td>{value.capacidade}</td>
                                <td>{value.peso}</td>
                            </tr>
                        )) :
                            <tr>
                                <p className="p1">Não existem modelos cadastrados :(</p>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}