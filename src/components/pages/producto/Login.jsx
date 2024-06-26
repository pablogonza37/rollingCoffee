import { Button, Card, Form, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { login } from "../../../helpers/queries";

const Login = ({ setUsuarioLogueado }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navegacion = useNavigate();

  const onSubmit = async (usuario) => {
    const respuesta = await login(usuario);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();

      sessionStorage.setItem(
        "usuarioRollingCoffee",
        JSON.stringify({
          email: datos.email,
          token: datos.token,
          rol: datos.rol,
          suspendido: datos.suspendido,
        })
      );
      setUsuarioLogueado(datos);
      if (datos.rol === "admin") {
        Swal.fire(
          "¡Bienvenido!",
          "Has iniciado sesión correctamente",
          "success"
        );
        navegacion("/administrador/productos");
      } else {
        Swal.fire(
          "¡Bienvenido!",
          "Has iniciado sesión correctamente",
          "success"
        );
        navegacion("/");
      }
    } else {
      Swal.fire("Ocurrió un error", "Correo o contraseña incorrectos", "error");
    }
  };

  return (
    <Container className="mainSection my-5 d-flex justify-content-center">
      <img
        src="https://images.pexels.com/photos/11739318/pexels-photo-11739318.jpeg"
        alt=""
        style={{ width: "25rem", height: "auto" }}
        className="img-fluid d-none d-lg-block shadow"
      />
      <Card style={{ width: "25rem" }} className="shadow rounded-0 border-0">
        <Card.Body>
          <h4 className="display-6 mb-4">Iniciar sesión</h4>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                {...register("email", {
                  required: "Email es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Col>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  {...register("password", {
                    required: "Contraseña es requerida",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.password?.message}
                </Form.Text>
              </Col>
            </Form.Group>
            <div className="d-flex justify-content-center mt-4">
              <Button variant="success" type="submit" className="w-100">
                Ingresar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
