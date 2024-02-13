"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getAllAlumnos,
  getInstrumentoById,
  getProfesorById,
  getRolById,
  getUsuarioById,
} from "@/lib/firebase/crud/read";
import Loader from "../components/Loader";

const Page = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const alumnos = await getAllAlumnos();
      if (alumnos !== null && alumnos.length > 0) {
        for (const alumno of alumnos) {
          alumno.usuario = await getUsuarioById(alumno.usuario.id);
          alumno.usuario.rol = await getRolById(alumno.usuario.rol.id);
          alumno.profesor = await getProfesorById(alumno.profesor.id);
          alumno.profesor.usuario = await getUsuarioById(
            alumno.profesor.usuario.id
          );
          alumno.profesor.usuario.rol = await getRolById(
            alumno.profesor.usuario.rol.id
          );
          alumno.profesor.instrumento = await getInstrumentoById(
            alumno.profesor.instrumento.id
          );
        }
        setData(alumnos);
      } else setData(null);
      console.log(alumnos);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col gap-10">
      {loading ? (
        <Loader />
      ) : data !== null ? (
        <>
          <h1>Alumnos</h1>
          {data.map((alumno) => (
            <ul className="flex gap-5" key={alumno.id}>
              {alumno.usuario && (
                <div>
                  <li>{alumno.usuario.nombre}</li>
                  <li>{alumno.usuario.apellido}</li>
                  <li>{alumno.usuario.email}</li>
                  <li>{alumno.usuario.telefono}</li>
                  <li>
                    {alumno.usuario.rol
                      ? alumno.usuario.rol.nombre
                      : "Rol no encontrado"}
                  </li>
                </div>
              )}
              {alumno.profesor && (
                <ul className="text-sm text-white text-opacity-50">
                  <li>{alumno.profesor.usuario.nombre}</li>
                  <li>{alumno.profesor.usuario.apellido}</li>
                  <li>{alumno.profesor.usuario.email}</li>
                  <li>{alumno.profesor.usuario.telefono}</li>
                  <li>
                    {alumno.profesor.usuario.rol
                      ? alumno.profesor.usuario.rol.nombre
                      : "Rol no encontrado"}
                  </li>
                  <li>
                    {alumno.profesor.instrumento
                      ? alumno.profesor.instrumento.nombre
                      : "Instrumento no encontrado"}
                  </li>
                </ul>
              )}
            </ul>
          ))}
          <button onClick={() => router.back()}>Regresar</button>
        </>
      ) : (
        <>
          <h1>Alumnos</h1>
          <p>No hay alumnos registrados</p>
          <button onClick={() => router.back()}>Regresar</button>
        </>
      )}
    </div>
  );
};
export default Page;
