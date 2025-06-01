'use client'

import { Header } from "@/components/header";
import { Pagina } from "@/components/pagina";
import { SideBar } from "@/components/sidebar";
import { useContext, useEffect, useState } from "react";
import { ContratarContactContext } from "./contratar";

import Image from "next/image" 
import { Pessoas } from "@/types/types";

export default function Home() {
  const { showConfirm } = useContext(ContratarContactContext)!
  const [contatos,setContatos] = useState<Pessoas[]>([])
  
  const alterarTipo = async () => {
    const resultado = await showConfirm("Adicionar novo membro?")
    if (resultado) {
      setContatos((prevDados) => [
        ...prevDados,
        { nome: resultado.first, email: resultado.email, foto: "/Image.svg" }
      ])
    }
    return 
  }

  useEffect(() => {
    fetch('api/contact')
    .then(res => res.json())
    .then(dados => {
      setContatos(dados.mensagem)
    })
  
  },[])

  return (
    <>
      <Header />
      <SideBar />

      <Pagina>
        <h1 className="absolute left-[2.7vw] top-[2vw] font-bold text-[32px] text-[#FFFFFF]">Contact</h1>
        <button className="absolute right-[2.7vw] top-[2vw] w-[147px] h-[48px] bg-[#4379EE] font-bold text-[14px] text-[#FFFFFF] rounded-[6px] hover:scale-115" onClick={alterarTipo}>Add New Contact</button>
        <div className="grid grid-cols-3 absolute w-[82vw] max-h-[40vw] h-auto top-[5vw]">
          {contatos.map((item, index) => {

            return (
              <div key={index} className="flex relative w-[412px] h-[434px] items-center justify-center bg-[#273142] rounded-[18px] select-none">
                <Image
                  className="absolute top-0"
                  src={item.foto}
                  alt="Foto do contato"
                  width={412}
                  height={276}
                  priority
                />

                <h1 className="absolute bottom-[4.5vw] text-[#FFFFFF] text-[16px] font-bold">{item.nome}</h1>
                <h2 className="absolute bottom-[3.5vw] text-[#FFFFFF] text-[14px] opacity-[60%]">{item.email}</h2>
                <Image
                  onClick={() => window.location.href='mailto:'+item.email}
                  className="absolute bottom-[.5vw]"
                  src={'/Massage.svg'}
                  alt="Foto da box email"
                  width={137}
                  height={40}
                  priority
                />
              </div>
            )
          })}
        </div>
      </Pagina>
    </>
  );
}
