import { useNavigate } from "react-router-dom"

export default function Layout({ children }) {
    const navigate = useNavigate()

    return (
        <div className="full-height flex-row">
            {/* Side menu */}
            <div className="full-height side-menu flex-column-space-between pr1">
                <div>
                    <h2 className="pt2 pointer" onClick={() => navigate('/')}>Airport Manager</h2>
                    <div className="pt2 flex-column">
                        <a className="side-menu-link pointer pt2" onClick={() => navigate('/avioes')}>Aviões</a>
                        <a className="side-menu-link pointer pt1" onClick={() => navigate('/controlador')}>Controlador</a>
                        <a className="side-menu-link pointer pt1" onClick={() => navigate('/empregados')}>Empregados</a>
                        <a className="side-menu-link pointer pt1" onClick={() => navigate('/modelos')}>Modelos</a>
                        <a className="side-menu-link pointer pt1" onClick={() => navigate('/pericia')}>Perícia</a>
                        <a className="side-menu-link pointer pt1" onClick={() => navigate('/registrotestes')}>Registro de Testes</a>
                        <a className="side-menu-link pointer pt1" onClick={() => navigate('/testes')}>Testes</a>
                    </div>
                </div>
                <div className="pb2">
                    <p>Gabriel F. Junkes</p>
                    <p>Luciano W. de Abreu</p>
                </div>

            </div>
            {/* Content */}
            <div className="content p2">
                {children}
            </div>
        </div>
    )
}