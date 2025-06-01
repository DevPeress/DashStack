'use client'

import { Header } from "@/components/header";
import { Pagina } from "@/components/pagina";
import { SideBar } from "@/components/sidebar";

import Image from "next/image" 
import { useEffect, useState } from "react";
import { Contratar } from "./contratar";

interface Team {
  nome: string,
  cargo: string,
  email: string,
  foto: string
}

export default function Home() {
  const [tipo,setTipo] = useState(false)
  const [funcionarios,setFuncionarios] = useState<Team[]>([])

  const alterarTipo = () => {
    setTipo(!tipo)
  }

  useEffect(() => {
    fetch('api/team')
    .then(res => res.json())
    .then(dados => {
      console.log(dados)
      setFuncionarios(dados.mensagem)
    })

  },[])

  return (
    <>
      <Header />
      <SideBar />

      <Pagina>
        <h1 className="absolute left-[2.7vw] top-[2vw] font-bold text-[32px] text-[#FFFFFF]">Team</h1>
        <button className="absolute right-[2.7vw] top-[2vw] w-[147px] h-[48px] bg-[#4379EE] font-bold text-[14px] text-[#FFFFFF] rounded-[6px] hover:scale-115" onClick={alterarTipo}>{tipo ? "Voltar" : "Novo membro"}</button>
        {tipo ? 
          <>
            <Contratar />
          </>

          :
          <div className="flex absolute top-[6vw] w-[82vw] max-h-[37.5vw] h-auto items-center justify-left overflow-x-hidden overflow-y-auto flex-wrap">
            {funcionarios.length > 0 && funcionarios.map((item,index) => {

              return(
                <div key={index} className="flex relative w-[262px] h-[289px] mr-[2vw] mb-[1vw]">
                  <Image
                    src={'/Cards.svg'}
                    alt="Estrela do To-DO"
                    width={262}
                    height={289}
                    priority                
                  />

                  <div className="flex absolute w-full h-full items-center justify-center">
                    <Image
                      className="absolute top-[2vw]"
                      src={item.foto}
                      alt="Foto do usuário"
                      width={110}
                      height={111}
                      priority                
                    />
                    <h1 className="absolute top-[9vw] text-[#FFFFFF] text-[16px] font-bold">{item.nome}</h1>
                    <h2 className="absolute top-[10.5vw] text-[#FFFFFF] text-[14px] font-semibold opacity-[70%]">{item.position}</h2>
                    <h2 className="absolute top-[12vw] text-[#FFFFFF] text-[14px] font-normal opacity-[80%]">{item.email}</h2>
                  </div>
                </div>
              )
            })}
          </div>
        }
      </Pagina>
    </>
  );
}
