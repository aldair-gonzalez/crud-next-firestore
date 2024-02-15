"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"

const Page = () => {
  const router = useRouter()

  return (
    <section className="Section">
      <h1>Roles</h1>

      <ul className="flex items-center justify-center gap-5">
        <li>
          <Link href="/roles/all">Ver todos los roles</Link>
        </li>
      </ul>

      <button onClick={() => router.back()}>Regresar</button>
    </section>
  )
}
export default Page