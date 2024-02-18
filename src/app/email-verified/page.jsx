import Link from "next/link";

const page = () => {
  return (
    <div>
      No has verificado tu cuenta
      <Link href="/sign-in">Iniciar Sesion</Link>
    </div>
  );
};
export default page;
