"use client";

import Loader from "@/app/components/Loader";
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
        console.log(fetch)
      } else setData(null);
      setLoading(false);
    })();
  }, [params.id]);

  return (
    <section className="Section">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>{data.nombre} {data.apellido}</h1>
        </>
      )}

      {!loading ? <button onClick={() => router.back()}>Regresar</button> : ""}
    </section>
  );
};
export default Page;
