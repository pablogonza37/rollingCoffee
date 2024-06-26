import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  crearProductoAPI,
  editarProductoAPI,
  obtenerProductoAPI,
} from "../../../helpers/queries";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const FormularioProducto = ({ editar, titulo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const { id } = useParams();
  const navegacion = useNavigate();

  useEffect(() => {
    if (editar) {
      cargarDatosProducto();
    }
  }, []);

  const cargarDatosProducto = async () => {
    try {
      const respuesta = await obtenerProductoAPI(id);
      if (respuesta.status === 200) {
        const productoEncontrado = await respuesta.json();
        setValue("nombreProducto", productoEncontrado.nombreProducto);
        setValue("precio", productoEncontrado.precio);
        setValue("imagen", productoEncontrado.imagen);
        setValue("categoria", productoEncontrado.categoria);
        setValue("descripcionBreve", productoEncontrado.descripcionBreve);
        setValue("descripcionAmplia", productoEncontrado.descripcionAmplia);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const productoValidado = async (producto) => {
    if (editar) {
      const respuesta = await editarProductoAPI(producto, id);
      if (respuesta.status === 200) {
        Swal.fire({
          title: "Producto modificado!",
          text: `El producto "${producto.nombreProducto}" fue modificado correctamente`,
          icon: "success",
        });
        navegacion("/administrador/productos");
      } else {
        Swal.fire({
          title: "Ocurrio un error!",
          text: `El producto "${producto.nombreProducto}" no pudo ser modificado. Intente esta opercion en unos minutos`,
          icon: "error",
        });
      }
    } else {
      const respuesta = await crearProductoAPI(producto);
      if (respuesta.status === 201) {
        Swal.fire({
          title: "Producto creado!",
          text: `El producto "${producto.nombreProducto}" fue creado correctamente`,
          icon: "success",
        });
        reset();
      } else {
        Swal.fire({
          title: "Ocurrio un error!",
          text: `El producto "${producto.nombreProducto}" no pudo ser creado. Intente esta opercion en unos minutos`,
          icon: "error",
        });
      }
    }
  };

  return (
    <section className="container mainSection">
      <h1 className="display-4 mt-5">{titulo}</h1>
      <hr />
      <Form className="my-4" onSubmit={handleSubmit(productoValidado)}>
        <Form.Group className="mb-3" controlId="formNombreProdcuto">
          <Form.Label>Producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Cafe"
            {...register("nombreProducto", {
              required: "El nombre del producto es obligatorio",
              minLength: {
                value: 2,
                message:
                  "El nombre del producto debe tener como minimo 2 caracteres",
              },
              maxLength: {
                value: 25,
                message:
                  "El nombre del producto debe tener como maximo 25 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.nombreProducto?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 50"
            {...register("precio", {
              required: "El precio del producto es obligatorio",
              min: {
                value: 50,
                message: "El precio como minimo debe ser de $50",
              },
              max: {
                value: 10000,
                message: "El precio como maximo debe ser de $10000",
              },
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "El precio debe ser un número con hasta dos decimales",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.precio?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://www.pexels.com/es-es/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
            {...register("imagen", {
              required: "La URL de la imagen es obligatoria",
              pattern: {
                value: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/,
                message: "URL inválida",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCategoria">
          <Form.Label>Categoría*</Form.Label>
          <Form.Select
            {...register("categoria", {
              required: "Por favor selecciona una opción",
            })}
          >
            <option value="">Seleccione una opcion</option>
            <option value="Infusiones">Infusiones</option>
            <option value="Batidos">Batidos</option>
            <option value="Dulce">Dulce</option>
            <option value="Salado">Salado</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.categoria?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescripcion">
          <Form.Label>Descripción breve*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Una taza de café suave y aromático."
            as="textarea"
            {...register("descripcionBreve", {
              required: "La descripción breve es requerida",
              minLength: {
                value: 5,
                message: "La descripcion breve dbe tener al menos 5 caracteres",
              },
              maxLength: {
                value: 50,
                message:
                  "La descripción breve no puede exceder los 50 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.descripcionBreve?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescripcionAmplia">
          <Form.Label>Descripción Amplia*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: El café americano es una bebida caliente que consiste en un espresso diluido con agua caliente, lo que resulta en una taza de café suave y aromático. Es una opción popular para aquellos que prefieren un café menos intenso que el espresso tradicional. Perfecto para disfrutar en cualquier momento del día."
            as="textarea"
            {...register("descripcionAmplia", {
              required: "La descripción amplia es requerida",
              minLength: {
                value: 50,
                message:
                  "La descripción amplia debe tener al menos 50 caracteres",
              },
              maxLength: {
                value: 300,
                message:
                  "La descripción amplia debe tener como maximo 300 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.descripcionAmplia?.message}
          </Form.Text>
        </Form.Group>

        <Button type="submit" variant="success">
          Guardar
        </Button>
      </Form>
    </section>
  );
};

export default FormularioProducto;
