"use client";

import Loader from "@/app/components/Loader";
import {
  getClaseById,
  getInstrumentoById,
  getProfesorById,
  getUsuarioById,
} from "@/lib/firebase/crud/read";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = ({ params }) => {
  const { id } = params;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [clase, setClase] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const fetch = await getClaseById(id);
      if (!fetch.error) {
        fetch.profesor = await getProfesorById(fetch.profesor.id);
        fetch.profesor.usuario = await getUsuarioById(
          fetch.profesor.usuario.id
        );
        fetch.profesor.instrumento = await getInstrumentoById(
          fetch.profesor.instrumento.id
        );
        setClase(fetch);
      } else setClase(null);
      setLoading(false);
    })();
  }, [id]);

  return (
    <section className="Section">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>
            Actualizar clase del profesor {clase.profesor.usuario.nombre}{" "}
            {clase.profesor.usuario.apellido} (
            {clase.profesor.instrumento.nombre})
          </h1>

          <ul>
            <li>
              fecha: {new Date(clase.fecha.seconds * 1000).getDate()}/
              {new Date(clase.fecha.seconds * 1000).getMonth()}/
              {new Date(clase.fecha.seconds * 1000).getFullYear()}
            </li>
            <li>hora de inicio: {clase.hora_inicio}</li>
            <li>hora de fin: {clase.hora_fin}</li>
            <li>estado: {clase.status}</li>
          </ul>

          <button onClick={() => router.back()}>Regresar</button>
        </>
      )}
    </section>
  );
};
export default Page;
