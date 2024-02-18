"use client";

import { logOut } from "@/lib/auth";
import Link from "next/link";

export default function Home() {
  const handleLogout = async () => {
    const res = await logOut();
    if (res) alert("Sesión cerrada");
    else alert("Error al cerrar sesión");
    return;
  };

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
      <button className="text-xs" onClick={() => handleLogout()}>
        Cerrar sesión
      </button>
    </main>
  );
}
