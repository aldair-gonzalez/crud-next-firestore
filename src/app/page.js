import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center flex-col gap-10">
      CRUD
      <div className="flex items-center justify-center gap-5">
        <Link href="/instrumentos">Instrumentos</Link>
        <Link href="/roles">Roles</Link>
        <Link href="/usuarios">Usuarios</Link>
        <Link href="/profesores">Profesores</Link>
        <Link href="/alumnos">Alumnos</Link>
        <Link href="/clases">Clases</Link>
      </div>
    </main>
  );
}
