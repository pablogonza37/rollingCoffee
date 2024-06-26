const URL_Productos = import.meta.env.VITE_API_PRODUCTO;
const URL_Usuarios = import.meta.env.VITE_API_USUARIO;
const URL_Login= import.meta.env.VITE_API_LOGIN;


export const leerProductosAPI = async () => {
  try {
    const respuesta = await fetch(URL_Productos);
    if (!respuesta.ok) {
      throw new Error('No se pudo cargar la lista de recetas');
    }
    const listaProductos = await respuesta.json();
    return listaProductos;
  } catch (error) {
    throw new Error('Error al cargar las productos desde la API: ' + error.message);
  }
};

export const crearProductoAPI = async (productoNuevo) => {
  try {
    const respuesta = await fetch(URL_Productos, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productoNuevo),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const borrarProductoAPI = async (id) => {
  try {
    const respuesta = await fetch(`${URL_Productos}/${id}`, {
      method: "DELETE",
    });
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerProductoAPI = async (id) => {
  try {
    const respuesta = await fetch(URL_Productos + "/" + id);
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const editarProductoAPI = async (productoModificado, id) => {
  try {
    const respuesta = await fetch(`${URL_Productos}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productoModificado),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const crearUsuarioAPI = async (nuevoUsuario) => {
  try {
    const respuesta = await fetch(URL_Usuarios, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoUsuario),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const leerUsuariosAPI = async () => {
  try {
    const respuesta = await fetch(URL_Usuarios);
    if (!respuesta.ok) {
      throw new Error('No se pudo cargar la lista de usuarios');
    }
    const listaUsuarios = await respuesta.json();
    return listaUsuarios;
  } catch (error) {
    throw new Error('Error al cargar los usuarios desde la API: ' + error.message);
  }
};

export const obtenerUsuarioAPI = async (id) => {
  try {
    const respuesta = await fetch(URL_Usuarios + "/" + id);
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const borrarUsuarioAPI = async (id) => {
  try {
    const respuesta = await fetch(`${URL_Usuarios}/${id}`, {
      method: "DELETE",
    });
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const editarUsuarioAPI = async (usuarioEditado, id) => {
  try {
    const respuesta = await fetch(`${URL_Usuarios}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarioEditado),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (usuario) =>{
  try {
    const respuesta = await fetch(URL_Login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    return  respuesta
  } catch (error) {
    console.log("errores en el login");
    return;
  }
}

