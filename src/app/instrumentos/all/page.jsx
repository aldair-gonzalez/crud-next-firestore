"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getAllInstrumentos } from "@/lib/firebase/crud/read";
import Loader from "../../components/Loader";
import Tabla from "@/app/components/Tabla";
import Link from "next/link";

const Page = () => {
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const instrumentos = await getAllInstrumentos();
      if (instrumentos !== null && instrumentos.length > 0) {
        for (const instrumento of instrumentos) {
          const arrayColumns = Object.keys(instrumento);
          arrayColumns.push("Acción");
          setColumns(arrayColumns);
          break;
        }
        setData(instrumentos);
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
          <Tabla title="Instrumentos registrados" columns={columns}>
            {data.map((instrumento) => (
              <tr className="Row" key={instrumento.id}>
                <td>{instrumento.id}</td>
                <th scope="row">{instrumento.nombre}</th>
                <td>
                  <Link
                    href={`/instrumentos/all/${instrumento.id}`}
                    className="Button"
                  >
                    Ver detalles
                  </Link>
                </td>
              </tr>
            ))}
          </Tabla>
        </>
      ) : (
        <p>No hay instrumentos</p>
      )}

      {!loading ? <button onClick={() => router.back()}>Regresar</button> : ""}
    </section>
  );
};
export default Page;
