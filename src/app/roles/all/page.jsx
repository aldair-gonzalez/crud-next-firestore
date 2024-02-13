"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getAllRoles } from "@/lib/firebase/crud/read";
import Loader from "../../components/Loader";

const Page = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getAllRoles();
      if (data !== null && data.length > 0) setData(data);
      else setData(null);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col gap-10">
      {loading ? (
        <Loader />
      ) : data !== null ? (
        <>
          <h1>Roles</h1>
          {data.map((rol) => (
            <ul key={rol.id}>
              <li key={rol.id}>{rol.nombre}</li>
            </ul>
          ))}
          <button onClick={() => router.back()}>Regresar</button>
        </>
      ) : (
        <>
          <h1>Roles</h1>
          <p>No hay roles</p>
          <button onClick={() => router.back()}>Regresar</button>
        </>
      )}
    </div>
  );
};
export default Page;
