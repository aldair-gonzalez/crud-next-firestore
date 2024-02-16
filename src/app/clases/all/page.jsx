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
import Tabla from "@/app/components/Tabla";
import Link from "next/link";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const columnas = [
    "id",
    "fecha",
    "hora de inicio",
    "hora de finzalización",
    "profesor",
    "estado",
    "acciones",
  ];

  useEffect(() => {
    (async () => {
      setLoading(true);
      const clases = await getAllClases();
      if (clases !== null && clases.length > 0) {
        for (const clase of clases) {
          const fecha = new Date(clase.fecha.seconds * 1000);
          clase.fecha = `${fecha.getDate()}/${
            fecha.getMonth() + 1
          }/${fecha.getFullYear()}`;
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
          <Tabla title="Clases registradas" columns={columnas}>
            {data.map((clase) => (
              <tr key={clase.id} className="Row">
                <td>{clase.id}</td>
                <td>{clase.fecha}</td>
                <td>{clase.hora_inicio}</td>
                <td>{clase.hora_fin}</td>
                <td>
                  {clase.profesor.usuario.nombre}{" "}
                  {clase.profesor.usuario.apellido} (
                  {clase.profesor.instrumento.nombre})
                </td>
                <th scope="row">{clase.status}</th>
                <td>
                  <Link href={`/clases/all/${clase.id}`} className="Button">Ver</Link>
                </td>
              </tr>
            ))}
          </Tabla>
        </>
      ) : (
        <p>No hay clases</p>
      )}

      {!loading ? <button onClick={() => router.back()}>Regresar</button> : ""}
    </div>
  );
};
export default Page;
