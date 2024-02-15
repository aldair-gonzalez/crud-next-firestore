"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <section className="flex flex-col gap-10 items-center justify-center">
      <h1>Profesores</h1>

      <ul className="flex items-center justify-center gap-5">
        <li>
          <Link className="Button" href="/profesores/all">
            Ver todos los profesores
          </Link>
        </li>
        <li>
          <Link className="Button" href="/profesores/create">
            Añadir profesor
          </Link>
        </li>
      </ul>

      <button onClick={() => router.back()}>Regresar</button>
    </section>
  );
};
export default Page;
