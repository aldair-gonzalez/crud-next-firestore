"use client";

import Link from "next/link";

import { signOut } from "@/lib/firebase/auth";
import { useAuth } from "@/lib/firebase/useAuth";

export default function Home() {
  const auth = useAuth();

  const handleLogout = async () => {
    await signOut();
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
      {auth && (
        <button className="text-xs" onClick={() => handleLogout()}>
          Cerrar sesión
        </button>
      )}
    </main>
  );
}
