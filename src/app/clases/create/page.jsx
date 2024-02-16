"use client";

import Loader from "@/app/components/Loader";
import { createClase } from "@/lib/firebase/crud/create";
import {
  getAllProfesores,
  getInstrumentoById,
  getUsuarioById,
} from "@/lib/firebase/crud/read";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);
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
        console.log(fetchProfesores);
      } else setProfesores(null);
      setLoading(false);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPostLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const fetch = await createClase(data)
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
          <h1>Agendar nueva clase</h1>

          <form className="Form" onSubmit={handleSubmit} autoComplete="off">
            <div className="grid grid-cols-2 gap-5">
              <div className="Input">
                <label htmlFor="fecha">Fecha</label>
                <input type="date" name="fecha" required />
              </div>
              <div className="Input">
                <label htmlFor="hora_inicio">Hora de inicio</label>
                <input type="time" name="hora_inicio" required />
              </div>
              <div className="Input">
                <label htmlFor="hora_fin">Hora de finalización</label>
                <input type="time" name="hora_fin" required />
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
              <div className="Input">
                <label htmlFor="status">Estado de la clase</label>
                <input type="text" name="status" required />
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
