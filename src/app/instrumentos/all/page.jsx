"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getAllInstrumentos } from "@/lib/firebase/crud/read";
import Loader from "../../components/Loader";

const Page = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getAllInstrumentos();
      if (data !== null && data.length > 0) setData(data);
      else setData(null);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col gap-10">
      {loading ? (
        <Loader />
      ) : (
        data !== null ? (
          <>
            <h1>Instrumentos</h1>
            {data.map((instrumento) => (
              <ul key={instrumento.id}>
                <li>{instrumento.nombre}</li>
              </ul>
            ))}
            <button onClick={() => router.back()}>Regresar</button>
          </>
        ) : (
          <>
            <h1>Instrumentos</h1>
            <p>No hay instrumentos</p>
            <button onClick={() => router.back()}>Regresar</button>
          </>
        )
      )}
    </div>
  );
};
export default Page;
