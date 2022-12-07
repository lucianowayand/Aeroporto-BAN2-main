import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout";

import Avioes from "../pages/avioes";
import Controlador from "../pages/controlador";
import Empregados from "../pages/empregados";
import Home from "../pages/home";
import Modelos from "../pages/modelos";
import NotFound from "../pages/not_found";
import Testes from "../pages/testes";
import Pericia from "../pages/pericias";
import Testa from "../pages/testas";

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/avioes" element={<Avioes />} />
          <Route path="/empregados" element={<Empregados />} />
          <Route path="/modelos" element={<Modelos />} />
          <Route path="/testes" element={<Testes />} />
          <Route path="/controlador" element={<Controlador />} />
          <Route path="/pericia" element={<Pericia />} />
          <Route path="/registrotestes" element={<Testa />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
