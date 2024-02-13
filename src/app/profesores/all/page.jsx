"use client";

import {
  getAllProfesores,
  getInstrumentoById,
  getUsuarioById,
} from "@/lib/firebase/crud/read";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

const Page = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const profesores = await getAllProfesores();
      if (profesores.length > 0) {
        for (const profesor of profesores) {
          profesor.usuario = await getUsuarioById(profesor.usuario.id);
          profesor.instrumento = await getInstrumentoById(
            profesor.instrumento.id
          );
        }
        setData(profesores);
      } else setData(null);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col gap-10">
      {loading ? (
        <Loader />
      ) : data !== null ? (
        <>
          <h1>Profesores</h1>
          {data.map((profesor) => (
            <ul key={profesor.id}>
              <li>{profesor.usuario.nombre}</li>
              <li>{profesor.usuario.apellido}</li>
              <li>{profesor.usuario.email}</li>
              <li>{profesor.usuario.telefono}</li>
              {profesor.instrumento && <li>{profesor.instrumento.nombre}</li>}
            </ul>
          ))}
          <button onClick={() => router.back()}>Regresar</button>
        </>
      ) : (
        <>
          <h1>Profesores</h1>
          <p>No hay profesores</p>
          <button onClick={() => router.back()}>Regresar</button>
        </>
      )}
    </div>
  );
};
export default Page;
