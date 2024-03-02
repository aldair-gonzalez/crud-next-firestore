"use client";

import { signUp } from "@/lib/firebase/auth";
import {
  getAllInstrumentos,
  getAllProfesores,
  getAllRoles,
  getInstrumentoById,
  getRolById,
  getUsuarioById,
} from "@/lib/firebase/crud/read";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const Page = () => {
  const [roles, setRoles] = useState(null);
  const [profesores, setProfesores] = useState(null);
  const [instrumentos, setInstrumentos] = useState(null);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [instrumento, setInstrumento] = useState();
  const [profesor, setProfesor] = useState();
  const [rol, setRol] = useState();

  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const fetchRoles = await getAllRoles();
      const fetchProfesores = await getAllProfesores();
      const fetchInstrumentos = await getAllInstrumentos();
      for (const profesor of fetchProfesores) {
        profesor.usuario = await getUsuarioById(profesor.usuario.id);
        profesor.instrumento = await getInstrumentoById(
          profesor.instrumento.id
        );
      }
      setRoles(fetchRoles);
      setProfesores(fetchProfesores);
      setInstrumentos(fetchInstrumentos);
      setLoading(false);
    })();
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const getRol = await getRolById(rol);
      await signUp({
        user: {
          email,
          password,
          nombre,
          apellido,
          telefono,
          instrumento,
          profesor,
        },
        rolAsignado: getRol,
        sendEmail: true
      });

      setNombre("")
      setApellido("")
      setTelefono("")
      setEmail("")
      setPassword("")
      setInstrumento("")
      setProfesor("")
      setRol("")
      setIsRegister(true);
    } catch (error) {
      alert(error.message);
    }
    setSending(false);
  };

  return (
    <section className="Section">
      {loading ? (
        <Loader />
      ) : (
        <>
          <form className="Form" onSubmit={handleSignUp}>
            <h1>Sign up</h1>
            <div className="grid grid-cols-2 gap-5">
              <div className="Input">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  onChange={(e) => setNombre(e.target.value)}
                  value={nombre}
                />
              </div>
              <div className="Input">
                <label htmlFor="apellido">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  onChange={(e) => setApellido(e.target.value)}
                  value={apellido}
                />
              </div>
              <div className="Input">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  name="telefono"
                  placeholder="0000000000"
                  onChange={(e) => setTelefono(e.target.value)}
                  value={telefono}
                />
              </div>
              <div className="Input">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="Input">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="Input">
                <label htmlFor="rol">Rol</label>
                <select
                  name="rol"
                  className="Select"
                  defaultValue="DEFAULT"
                  onChange={(e) => setRol(e.target.value)}
                >
                  <option value="DEFAULT" disabled>
                    Seleccionar
                  </option>
                  {roles.map((rol) => (
                    <option key={rol.id} value={rol.id} id={rol.nombre}>
                      {rol.nombre}
                    </option>
                  ))}
                </select>
              </div>
              {roles.map((doc, i) => (
                <div key={i}>
                  {doc.id === rol && doc.nombre === "profesor" && (
                    <div className="Input">
                      <label htmlFor="instrumento">Instrumento</label>
                      <select
                        name="instrumento"
                        className="Select"
                        defaultValue="DEFAULT"
                        onChange={(e) => setInstrumento(e.target.value)}
                      >
                        <option value="DEFAULT" disabled>
                          Seleccionar
                        </option>
                        {instrumentos.map((instrumento) => (
                          <option key={instrumento.id} value={instrumento.id}>
                            {instrumento.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {doc.id === rol && doc.nombre === "alumno" && (
                    <div className="Input">
                      <label htmlFor="profesor">Profesor</label>
                      <select
                        name="profesor"
                        className="Select"
                        defaultValue="DEFAULT"
                        onChange={(e) => setProfesor(e.target.value)}
                      >
                        <option value="DEFAULT" disabled>
                          Seleccionar
                        </option>
                        {profesores.map((profesor) => (
                          <option key={profesor.id} value={profesor.id}>
                            {profesor.usuario.nombre}{" "}
                            {profesor.usuario.apellido} -{" "}
                            {profesor.instrumento.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button className={`Button ${sending && "Button-loading"}`} type="submit" disabled={sending}>
              Sign up
            </button>
          </form>
          <p className="text-xs text-gray-400">
            ¿Ya tienes una cuenta?{" "}
            <Link className="text-gray-200" href="/sign-in">
              Inicia sesión
            </Link>
          </p>
          {isRegister && (
            <div className="grid grid-cols-1 gap-2 place-content-center place-items-center">
              <p className="text-xs text-gray-400">
                Te envíamos un correo para que verifiques tu cuenta
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
};
export default Page;
