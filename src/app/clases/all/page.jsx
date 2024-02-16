"use client";

import {
  getAllClases,
  getInstrumentoById,
  getProfesorById,
  getRolById,
  getUsuarioById,
} from "@/lib/firebase/crud/read";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const clases = await getAllClases();
      if (clases !== null && clases.length > 0) {
        for (const clase of clases) {
          const fecha = new Date(clase.fecha.seconds * 1000);
          clase.fecha = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
          clase.profesor = await getProfesorById(clase.profesor.id);
          clase.profesor.usuario = await getUsuarioById(
            clase.profesor.usuario.id
          );
          clase.profesor.usuario.rol = await getRolById(
            clase.profesor.usuario.rol.id
          );
          clase.profesor.instrumento = await getInstrumentoById(
            clase.profesor.instrumento.id
          );
        }
        setData(clases);
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
          <h1>Clases</h1>
          {data.map((clase) => (
            <ul className="flex gap-5 cursor-pointer" key={clase.id} onClick={() => router.push(`/clases/all/${clase.id}`)}>
              <div>
                <li>{clase.fecha}</li>
                <li>{clase.hora_inicio}</li>
                <li>{clase.hora_fin}</li>
                <li>{clase.status}</li>
              </div>
              {clase.profesor && (
                <ul className="text-sm text-white text-opacity-50">
                  <li>{clase.profesor.usuario.nombre}</li>
                  <li>{clase.profesor.usuario.apellido}</li>
                  <li>{clase.profesor.usuario.email}</li>
                  <li>
                    {clase.profesor.usuario.rol
                      ? clase.profesor.usuario.rol.nombre
                      : "No se encontró el rol"}
                  </li>
                  <li>{clase.profesor.instrumento.nombre}</li>
                </ul>
              )}
            </ul>
          ))}
          <button onClick={() => router.back()}>Regresar</button>
        </>
      ) : (
        <>
          <h1>Clases</h1>
          <p>No hay clases</p>
          <button onClick={() => router.back()}>Regresar</button>
        </>
      )}
    </div>
  );
};
export default Page;
