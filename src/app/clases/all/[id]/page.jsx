"use client";

import { useParams, useRouter } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const router = useRouter()

  return (
    <section className="Section">
      <h1>Clase {id}</h1>

      <button onClick={() => router.back()}>Regresar</button>
    </section>
  );
};
export default Page;
