"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getAllUsuarios, getRolById } from "@/lib/firebase/crud/read";
import Loader from "../../components/Loader";
import Tabla from "@/app/components/Tabla";

const Page = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const columns = ["id", "nombre completo", "telefono", "email", "rol"];

  useEffect(() => {
    (async () => {
      setLoading(true);
      const usuarios = await getAllUsuarios();
      if (usuarios !== null && usuarios.length > 0) {
        for (const user of usuarios) {
          const rol = await getRolById(user.rol.id);
          user.rol = rol;
        }
        setData(usuarios);
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
          <Tabla title="Usuarios registrados" columns={columns}>
            {data.map((usuario) => (
              <tr key={usuario.id} className="Row">
                <td>{usuario.id}</td>
                <td>{usuario.nombre} {usuario.apellido}</td>
                <td>{usuario.telefono}</td>
                <th scope="row">{usuario.email}</th>
                <td>{usuario.rol.nombre}</td>
              </tr>
            ))}
          </Tabla>
        </>
      ) : (
        <p>No se encontraron usuarios</p>
      )}

      {!loading ? <button onClick={() => router.back()}>Regresar</button> : ""}
    </section>
  );
};
export default Page;
