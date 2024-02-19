"use client";

import { verifyEmail } from "@/lib/auth";
import Link from "next/link";

const page = () => {
  const handleVerifyEmail = async () => {
    await verifyEmail();
  };

  return (
    <section className="Section">
      No has verificado tu cuenta
      <div className="text-xs grid grid-cols-1 gap-2">
        <button onClick={() => handleVerifyEmail()}>
          Enviar correo de verificación
        </button>
        <Link href="/sign-in">
          Inicia sesión nuevamente con tu cuenta verificada
        </Link>
      </div>
    </section>
  );
};
export default page;
