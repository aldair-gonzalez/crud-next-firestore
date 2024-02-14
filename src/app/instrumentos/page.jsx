"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter()

  return (
    <section className="flex flex-col gap-10 items-center justify-center">
      <h1>Instrumentos</h1>

      <ul className="flex items-center justify-center gap-5">
        <li>
          <Link href="/instrumentos/all">Ver todos los instrumentos</Link>
        </li>
        <li>
          <Link href="/instrumentos/create">Añadir instrumento</Link>
        </li>
      </ul>

      <button onClick={() => router.back()}>Regresar</button>
    </section>
  );
};
export default Page;
