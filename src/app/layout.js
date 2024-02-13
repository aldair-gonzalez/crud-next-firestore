import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crud de test mpvoices",
  description: "Base de datos de test para la escuela argentina de música mpvoices.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`w-screen min-h-screen overflow-x-hidden flex flex-col gap-10 items-center justify-center ${inter.className}`}>{children}</body>
    </html>
  );
}
