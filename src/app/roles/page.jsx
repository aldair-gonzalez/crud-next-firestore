"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getAllRoles } from "@/lib/firebase/crud/read";
import Loader from "../components/Loader";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getAllRoles();
      setData(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col gap-10">
      <h1>Roles</h1>
      {loading
        ? <Loader />
        : data.map((rol) => (
            <ul key={rol.id}>
              <li key={rol.id}>{rol.nombre}</li>
            </ul>
          ))}
      <button onClick={() => router.back()}>Regresar</button>
    </div>
  );
};
export default Page;
