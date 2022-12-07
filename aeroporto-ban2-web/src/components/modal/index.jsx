import IconButton from "../icon_button"

export default function Modal({ children, modal, closeModal, updateFunction, deleteFunction }) {
    return (
        <>
            {modal ?
                <div className="modal-background">
                    < div className="position-absolute flex-center border modal-card" >
                        <div className="flex-column-space-between height-100">
                            <div>
                                <div className="flex-row-space-between">
                                    <div className="flex-row">
                                        <IconButton call={deleteFunction} icon="trash" />
                                        <h1 className="pl0-5"> Editar</h1>
                                    </div>
                                    <IconButton call={closeModal} icon="close" />
                                </div>
                                {children}
                            </div>
                            <div className="flex-row-space-between pt2">
                                <div>
                                    <button onClick={closeModal} className="outlined-button">Cancelar</button>
                                </div>
                                <div>
                                    <button onClick={updateFunction}>Salvar e Fechar</button>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
                : null}
        </>

    )
}