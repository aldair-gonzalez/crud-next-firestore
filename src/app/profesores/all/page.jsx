"use client";

import {
  getAllProfesores,
  getInstrumentoById,
  getUsuarioById,
} from "@/lib/firebase/crud/read";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Tabla from "@/app/components/Tabla";
import Link from "next/link";

const Page = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const columnas = [
    "id",
    "nombre",
    "apellido",
    "telefono",
    "email",
    "instrumento",
    "acciones",
  ];

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
          <Tabla title="Profesores registrados" columns={columnas}>
            {data.map((profesor) => (
              <tr key={profesor.id} className="Row">
                <td>{profesor.id}</td>
                <td>{profesor.usuario.nombre}</td>
                <td>{profesor.usuario.apellido}</td>
                <td>{profesor.usuario.telefono}</td>
                <th scope="row">{profesor.usuario.email}</th>
                <td>{profesor.instrumento.nombre}</td>
                <td>
                  <Link
                    className="Button"
                    href={`/profesores/all/${profesor.id}`}
                  >
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
          </Tabla>
        </>
      ) : (
        <p>No hay profesores</p>
      )}

      {!loading ? <button onClick={() => router.back()}>Regresar</button> : ""}
    </div>
  );
};
export default Page;
