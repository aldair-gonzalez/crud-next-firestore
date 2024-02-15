"use client";

import Loader from "@/app/components/Loader";
import { createProfesor } from "@/lib/firebase/crud/create";
import { getAllInstrumentos } from "@/lib/firebase/crud/read";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();

  const [postLoading, setPostLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [instrumentos, setInstrumentos] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const fetchInstrumentos = await getAllInstrumentos();
      if (fetchInstrumentos.length > 0) {
        setInstrumentos(fetchInstrumentos);
      } else setInstrumentos(null);
      setLoading(false);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPostLoading(true)
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const fetch = await createProfesor(data)
    console.log(fetch)
    // if(!fetch.error) e.target.reset()
    // else alert(fetch.error)
    setPostLoading(false)
  };

  return (
    <section className="Section">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>Nuevo profesor</h1>

          <form className="Form" onSubmit={handleSubmit} autoComplete="off">
            <div className="grid grid-cols-2 gap-5">
              <div className="Input">
                <label htmlFor="nombre">Nombre</label>
                <input
                  defaultValue="Aldair"
                  type="text"
                  name="nombre"
                  required
                />
              </div>
              <div className="Input">
                <label htmlFor="apellido">Apellido</label>
                <input
                  defaultValue="González"
                  type="text"
                  name="apellido"
                  required
                />
              </div>
              <div className="Input">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  defaultValue="999-999-9999"
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
                <input
                  defaultValue="aldairgome97@gmail.com"
                  type="email"
                  name="email"
                  required
                />
              </div>
              <div className="Input">
                <label htmlFor="contrasena">Contraseña</label>
                <input
                  defaultValue="123"
                  type="password"
                  name="contrasena"
                  required
                />
              </div>

              <div className="Input">
                <label htmlFor="instrumento">Instrumento</label>
                <select
                  className="bg-inherit px-2 py-1 appearance-none outline-none border border-gray-500 rounded-md focus:bg-black"
                  name="instrumento"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Seleccionar
                  </option>
                  {instrumentos
                    ? instrumentos.map((instrumento) => (
                        <option key={instrumento.id} value={instrumento.id}>
                          {instrumento.nombre}
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
