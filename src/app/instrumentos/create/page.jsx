"use client";

import { useRouter } from "next/navigation";
import { createInstrumento } from "@/lib/firebase/crud/create";
import { useState } from "react";

const Page = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const fetch = await createInstrumento(data);
    if(!fetch?.error) e.target.reset()
    else alert(fetch.error)
    setLoading(false);
  };

  return (
    <section className="Section">
      <h1>Nuevo instrumento</h1>

      <form
        className="Form"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="Input">
            <label htmlFor="nombre">Nombre del instrumento</label>
            <input type="text" name="nombre" placeholder="Instrumento" />
          </div>
        </div>
        <button
          disabled={loading}
          className={`Button ${loading && "Button-loading"}`}
          type="submit"
        >
          {loading ? "Cargando..." : "Guardar"}
        </button>
      </form>

      <button onClick={() => router.back()}>Regresar</button>
    </section>
  );
};
export default Page;
