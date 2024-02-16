"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getAllRoles } from "@/lib/firebase/crud/read";
import Loader from "../../components/Loader";
import Tabla from "@/app/components/Tabla";

const Page = () => {
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const roles = await getAllRoles();
      if (roles !== null && roles.length > 0) {
        for (const rol of roles) {
          const arrayColumns = Object.keys(rol);
          setColumns(arrayColumns);
          break
        }
        setData(roles);
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
          <Tabla title="Roles registrados" columns={columns}>
            {data.map((rol) => (
              <tr key={rol.id} className="Row">
                <td>{rol.id}</td>
                <th scope="row">{rol.nombre}</th>
              </tr>
            ))}
          </Tabla>
        </>
      ) : (
        <p>No hay roles</p>
      )}

      <button onClick={() => router.back()}>Regresar</button>
    </section>
  );
};
export default Page;
