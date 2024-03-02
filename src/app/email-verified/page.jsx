"use client";

import { verifyEmailAccount } from "@/lib/firebase/auth";
import Link from "next/link";

const page = () => {
  const handleVerifyEmail = async () => {
    await verifyEmailAccount();
  };

  return (
    <section className="Section">
      No has verificado tu cuenta
      <div className="text-xs grid grid-cols-2 gap-3">
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
