import Link from "next/link";

export default function Home() {return (
    <main className="flex items-center justify-center flex-col gap-10">
      CRUD

      <div className="flex items-center justify-center gap-5">
        <Link href="/instrumentos">Ver instrumentos</Link>
        <Link href="/roles">Ver roles</Link>
        <Link href="/usuarios">Ver usuarios</Link>
        <Link href="/profesores">Ver profesores</Link>
        <Link href="/alumnos">Ver alumnos</Link>
        <Link href="/clases">Ver clases</Link>
      </div>
    </main>
  );
}
