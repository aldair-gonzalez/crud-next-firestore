"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getAllInstrumentos } from "@/lib/firebase/crud/read";
import Loader from "../../components/Loader";
import Tabla from "@/app/components/Tabla";

const Page = () => {
  const [data, setData] = useState(null);
  const [colums, setColums] = useState(null);
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
          setColums(arrayColumns);
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
          <Tabla columns={colums}>
            {data.map((instrumento) => (
              <tr className="Row"
                key={instrumento.id}
              >
                <td>{instrumento.id}</td>
                <th scope="row">{instrumento.nombre}</th>
                <td>
                  <button className="Button" onClick={() => router.push(`/instrumentos/all/${instrumento.id}`)}>Ver detalles</button>
                </td>
              </tr>
            ))}
          </Tabla>
        </>
      ) : (
        <p>No hay instrumentos</p>
      )}

      <button onClick={() => router.back()}>Regresar</button>
    </section>
  );
};
export default Page;
