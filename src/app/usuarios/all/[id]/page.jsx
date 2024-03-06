"use client";

import Loader from "@/app/components/Loader";
import { deleteUserAsAdmin } from "@/lib/firebase/actions.admin";
import { getUsuarioById } from "@/lib/firebase/crud/read";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = ({ params }) => {
  const router = useRouter();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const fetch = await getUsuarioById(params.id);
      if (fetch) {
        setData(fetch);
      } else {
        router.push("/404");
        setData(null);
      }
      setLoading(false);
    })();
  }, [params.id, router]);

  const handleDeleteUser = async () => {
    try {
      await deleteUserAsAdmin({ uid: params.id });
      alert("Usuario eliminado");
      router.push("/usuarios/all");
    } catch (error) {
      alert(error.message);
    }
  };

  if (!data) return <Loader />;

  return (
    <section className="Section">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>
            {data.nombre} {data.apellido}
          </h1>
          <button onClick={handleDeleteUser}>Eliminar usuario</button>
        </>
      )}

      {!loading ? <button onClick={() => router.back()}>Regresar</button> : ""}
    </section>
  );
};
export default Page;
