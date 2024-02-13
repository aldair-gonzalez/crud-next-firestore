"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getAllUsuarios, getRolById } from "@/lib/firebase/crud/read";
import Loader from "../../components/Loader";

const Page = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    <div className="flex items-center justify-center flex-col gap-10">
      {loading ? (
        <Loader />
      ) : (
        data !== null ? (
          <>
            <h1>Usuarios</h1>
            {data.map((usuario) => (
              <ul key={usuario.id}>
                <li>{usuario.nombre}</li>
                <li>{usuario.apellido}</li>
                <li>{usuario.email}</li>
                <li>{usuario.telefono}</li>
                <li>
                  {usuario.rol ? usuario.rol.nombre : "Rol no encontrado"}
                </li>
              </ul>
            ))}
            <button onClick={() => router.back()}>Regresar</button>
          </>
        ) : (
          <>
            <h1>Usuarios</h1>
            <p>No se encontraron usuarios</p>
            <button onClick={() => router.back()}>Regresar</button>
          </>
        )
      )}
    </div>
  );
};
export default Page;
