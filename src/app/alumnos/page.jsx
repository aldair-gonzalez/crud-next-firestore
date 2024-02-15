"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <section className="flex flex-col gap-10 items-center justify-center">
      <h1>Alumnos</h1>

      <ul className="flex items-center justify-center gap-5">
        <li>
          <Link className="Button" href="/alumnos/all">
            Ver todos los alumnos
          </Link>
        </li>
        <li>
          <Link className="Button" href="/alumnos/create">
            Añadir alumno
          </Link>
        </li>
      </ul>

      <button onClick={() => router.back()}>Regresar</button>
    </section>
  );
};
export default Page;
