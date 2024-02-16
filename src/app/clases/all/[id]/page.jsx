"use client";

import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const router = useRouter();

  return (
    <section className="Section">
      <h1>Clase {params.id}</h1>

      <button className="Button" onClick={() => router.push(`/clases/all/${params.id}/update`)}>Actualizar clase</button>

      <button onClick={() => router.back()}>Regresar</button>
    </section>
  );
};
export default Page;
