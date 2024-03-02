"use client";

import Link from "next/link";
import { useState } from "react";

import { signIn } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn({ email, password });
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <section className="Section">
      <form className="Form" onSubmit={handleSignIn}>
        <h1>Sign in</h1>
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
        <button
          className={`Button ${loading ? "opacity-50" : ""}`}
          type="submit"
          aria-disabled={loading}
        >
          {loading ? "Cargando..." : "Sign in"}
        </button>
      </form>
      <p className="text-xs text-gray-400">
        ¿No tienes una cuenta?{" "}
        <Link className="text-gray-200" href="/sign-up">
          Crear cuenta
        </Link>
      </p>
    </section>
  );
};
export default Page;
