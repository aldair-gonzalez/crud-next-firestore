"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getAllInstrumentos } from "@/lib/firebase/crud/read";
import Loader from "../components/Loader";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getAllInstrumentos();
      setData(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col gap-10">
      <h1>Instrumentos</h1>
      {loading
        ? <Loader />
        : data.map((instrumento) => (
            <ul key={instrumento.id}>
              <li>{instrumento.nombre}</li>
            </ul>
          ))}
      <button onClick={() => router.back()}>Regresar</button>
    </div>
  );
};
export default Page;
