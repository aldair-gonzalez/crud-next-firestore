"use client";

import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const { id } = params;
  const router = useRouter();

  return (
    <section className="Section">
      <h1>Actualizar clase {id}</h1>

      <button onClick={() => router.back()}>Regresar</button>
    </section>
  );
};
export default Page;
