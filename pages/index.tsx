import Image from "next/image";
import { Inter } from "next/font/google";
import NewProductPage from "@/pages/components/NewProductPage"
const inter = Inter({ subsets: ["latin"] });
import { Button } from 'flowbite-react';
export default function Home() {
  return (
    <main>
      <NewProductPage/>
    </main>
  );
}
