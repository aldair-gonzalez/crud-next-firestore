"use client";

import Loader from "@/app/components/Loader";
import { createAlumno } from "@/lib/firebase/crud/create";
import {
  getAllProfesores,
  getInstrumentoById,
  getUsuarioById,
} from "@/lib/firebase/crud/read";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();

  const [postLoading, setPostLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profesores, setProfesores] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const fetchProfesores = await getAllProfesores();
      if (fetchProfesores.length > 0) {
        for (const profesor of fetchProfesores) {
          profesor.usuario = await getUsuarioById(profesor.usuario.id);
          profesor.instrumento = await getInstrumentoById(
            profesor.instrumento.id
          );
        }
        setProfesores(fetchProfesores);
      } else setProfesores(null);
      setLoading(false);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPostLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const fetch = await createAlumno(data)
    if (!fetch.error) e.target.reset()
    else alert(fetch.error)
    setPostLoading(false);
  };

  return (
    <section className="Section">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>Nuevo alumno</h1>

          <form className="Form" onSubmit={handleSubmit} autoComplete="off">
            <div className="grid grid-cols-2 gap-5">
              <div className="Input">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" name="nombre" required />
              </div>
              <div className="Input">
                <label htmlFor="apellido">Apellido</label>
                <input type="text" name="apellido" required />
              </div>
              <div className="Input">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder="Formato: 000-000-0000"
                  size={10}
                  minLength={9}
                  maxLength={14}
                  name="telefono"
                  required
                />
              </div>
              <div className="Input">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" required />
              </div>
              <div className="Input">
                <label htmlFor="contrasena">Contraseña</label>
                <input type="password" name="contrasena" required />
              </div>

              <div className="Input">
                <label htmlFor="profesor">Profesor</label>
                <select
                  className="bg-inherit px-2 py-1 appearance-none outline-none border border-gray-500 rounded-md focus:bg-black"
                  name="profesor"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Seleccionar
                  </option>
                  {profesores
                    ? profesores.map((profesor) => (
                        <option key={profesor.id} value={profesor.id}>
                          {profesor.usuario.nombre} {profesor.usuario.apellido}{" "}
                          {`(${profesor.instrumento.nombre})`}
                        </option>
                      ))
                    : ""}
                </select>
              </div>
            </div>

            <button
              disabled={postLoading}
              className={`Button ${postLoading && "Button-loading"}`}
              type="submit"
            >
              {postLoading ? "Cargando..." : "Guardar"}
            </button>
          </form>

          <button onClick={() => router.back()}>Regresar</button>
        </>
      )}
    </section>
  );
};
export default Page;
