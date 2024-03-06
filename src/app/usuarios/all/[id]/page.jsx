"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Loader from "@/app/components/Loader";
import { getUsuarioById } from "@/lib/firebase/crud/read";
import { deleteUserAsAdmin } from "@/lib/firebase/actions.admin";

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
            {data.full_name.nombre} {data.full_name.apellido}
          </h1>
          <button className="Button" onClick={handleDeleteUser}>
            Eliminar usuario
          </button>
        </>
      )}

      {!loading ? <button onClick={() => router.back()}>Regresar</button> : ""}
    </section>
  );
};
export default Page;
