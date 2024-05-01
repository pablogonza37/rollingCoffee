import { Routes, Route } from "react-router-dom";
import Administrador from "../pages/Administrador";
import FormularioProducto from "../pages/producto/FormularioProducto";


Routes;

const RutasAdmin = () => {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/productos"
          element={<Administrador tipo="productos"></Administrador>}
        ></Route>
        <Route
          exact
          path="/usuarios"
          element={<Administrador tipo="usuarios" />}
        />
        <Route
          exact
          path="/crear"
          element={
            <FormularioProducto
              editar={false}
              titulo="Nuevo producto"
            ></FormularioProducto>
          }
        ></Route>
        <Route
          exact
          path="/editar/:id"
          element={
            <FormularioProducto
              editar={true}
              titulo="Editar Producto"
            ></FormularioProducto>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default RutasAdmin;
