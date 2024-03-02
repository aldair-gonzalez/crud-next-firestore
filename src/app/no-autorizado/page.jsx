import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <p className="text-5xl">No estás autorizado para entrar a esta página.</p>
      <Link href="/">Ir al inicio</Link>
    </div>
  );
};
export default page;
