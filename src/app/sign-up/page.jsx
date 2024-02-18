"use client";

import { signUp } from "@/lib/auth";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await signUp({ email, password });
      if (res?.error && res?.code === "auth/email-already-in-use")
        alert("El usuario ya existe");
      else if (res?.code === "auth/weak-password")
        alert("La contraseña debe tener al menos 6 carácteres");
      else {
        alert("Te envíamos un correo para que verifiques tu cuenta")
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="Section">
      <form className="Form" onSubmit={handleSignUp}>
        <h1>Sign up</h1>
        <div className="grid grid-cols-2 gap-5">
          <div className="Input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="Input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>
        <button className="Button" type="submit">
          Sign up
        </button>
      </form>
      <p className="text-xs text-gray-400">
        ¿Ya tienes una cuenta?{" "}
        <Link className="text-gray-200" href="/sign-in">
          Inicia sesión
        </Link>
      </p>
    </section>
  );
};
export default Page;
