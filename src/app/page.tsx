'use client'

import { Header } from "@/components/header";
import { Pagina } from "@/components/pagina";
import { SideBar } from "@/components/sidebar";

export default function Home() {
  return (
    <>
      <Header />
      <SideBar />

      <Pagina>
      </Pagina>
    </>
  );
}
