"use client";

import { signOut, verifyEmailAccount } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter()

  const handleVerifyEmail = async () => {
    await verifyEmailAccount();
  };
  const handleLogout = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <section className="Section">
      No has verificado tu cuenta
      <div className="text-xs grid grid-cols-2 gap-3">
        <button onClick={() => handleVerifyEmail()}>
          Enviar correo de verificación
        </button>
        <button onClick={() => handleLogout()}>
          Inicia sesión nuevamente con tu cuenta verificada
        </button>
      </div>
    </section>
  );
};
export default Page;
