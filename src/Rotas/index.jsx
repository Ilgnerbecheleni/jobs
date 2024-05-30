import { Route, Routes } from "react-router-dom";
import Home from "../Screens/Home";
import Jobs from "../Screens/Jobs";
import Job from "../Screens/Job";
import Login from "../Screens/Login";
import CadastroJob from "../Screens/CadastroJob";
import { Fragment } from "react";
import PrivateRoutes from "./PrivateRoutes";
import EditarJob from "../Screens/EditarJob";

function Rotas() {
  return (
    <Routes>
      <Fragment>
        <Route path={"/"} element={<Home />} />
        <Route path={"/jobs"} element={<Jobs />} />
        <Route path={"/login"} element={<Login />} />

        {/* Envolver as rotas que você deseja proteger com PrivateRoutes */}
        <Route path="/" element={<PrivateRoutes />}>
          <Route path={"/job/:id"} element={<Job />} />
          <Route path={"job/cadastro"} element={<CadastroJob />} />
          <Route path={"job/editar/:id"} element={<EditarJob />} />
        </Route>
      </Fragment>
    </Routes>
  );
}

export default Rotas;
