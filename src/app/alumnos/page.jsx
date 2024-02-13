import Link from "next/link";

const page = () => {
  return (
    <section className="flex flex-col gap-10 items-center justify-center">
      <h1>Alumnos</h1>

      <ul className="flex items-center justify-center gap-5">
        <li>
          <Link href="/alumnos/all">Ver todos los alumnos</Link>
        </li>
        <li>
          <Link href="/alumnos/create">Nuevo alumno</Link>
        </li>
      </ul>
    </section>
  );
};
export default page;
