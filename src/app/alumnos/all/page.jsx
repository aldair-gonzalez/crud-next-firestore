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
import Loader from "../../components/Loader";
import Tabla from "@/app/components/Tabla";
import Link from "next/link";

const Page = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const columnas = [
    "id",
    "nombre completo",
    "telefono",
    "email",
    "profesor",
    "acciones",
  ];

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
      setLoading(false);
    })();
  }, []);

  return (
    <section className="Section">
      {loading ? (
        <Loader />
      ) : data !== null ? (
        <>
          <Tabla title="Alumnos registrados" columns={columnas}>
            {data.map((alumno) => (
              <tr key={alumno.id} className="Row">
                <td>{alumno.id}</td>
                <td>
                  {alumno.usuario.nombre} {alumno.usuario.apellido}
                </td>
                <td>{alumno.usuario.telefono}</td>
                <th scope="row">{alumno.usuario.email}</th>
                <td>
                  {alumno.profesor.usuario.nombre}{" "}
                  {alumno.profesor.usuario.apellido} (
                  {alumno.profesor.instrumento.nombre})
                </td>
                <td>
                  <Link className="Button" href={`/alumnos/all/${alumno.id}`}>Ver</Link>
                </td>
              </tr>
            ))}
          </Tabla>
        </>
      ) : (
        <p>No hay alumnos registrados</p>
      )}

      {!loading ? <button onClick={() => router.back()}>Regresar</button> : ""}
    </section>
  );
};
export default Page;
