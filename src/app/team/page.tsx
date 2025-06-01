'use client'

import { Header } from "@/components/header";
import { Pagina } from "@/components/pagina";
import { SideBar } from "@/components/sidebar";

import Image from "next/image" 
import { useContext, useEffect, useState } from "react";
import { ContratarTeamContext } from "./contratar";
import { Pessoas } from "@/types/types";

export default function Home() {
  const { showConfirm } = useContext(ContratarTeamContext)!

  const [funcionarios,setFuncionarios] = useState<Pessoas[]>([])

  const alterarTipo = async () => {
    const resultado = await showConfirm("Adicionar novo membro?")
    if (resultado) {
      setFuncionarios((prevDados) => [
        ...prevDados,
        { nome: resultado.first, position: resultado.position, email: resultado.email, foto: "/User.svg" }
      ])
    }
    return 
  }

  useEffect(() => {
    fetch('api/team')
    .then(res => res.json())
    .then(dados => {
      setFuncionarios(dados.mensagem)
    })

  },[])

  return (
    <>
      <Header />
      <SideBar />

      <Pagina>
        <h1 className="absolute md:left-[2.7vw] lg:left-[2.7vw] md:top-[3vw] lg:top-[2vw] font-bold md:text-[3.2vw] lg:text-[1.667vw] text-[#FFFFFF] select-none">Team</h1>
        <button className="absolute md:right-[2.7vw] lg:right-[2.7vw] md:top-[3vw] lg:top-[2vw] md:w-[12vw] lg:w-[7.656vw] md:h-[4vw] lg:h-[2.5vw] bg-[#4379EE] font-bold md:text-[1.4vw] lg:text-[0.729vw] text-[#FFFFFF] rounded-[0.313vw] hover:scale-115 select-none" onClick={alterarTipo}>Novo membro</button>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 absolute top-[10vw] lg:top-[6vw] md:w-[82vw] lg:w-[82vw] md:max-h-[90vw] lg:max-h-[37.5vw] h-auto items-center justify-left overflow-x-hidden overflow-y-auto">
          {funcionarios.length > 0 && funcionarios.map((item,index) => {

            return(
              <div key={index} className="flex relative md:w-[35vw] lg:w-[13.646vw] md:h-[40vw] lg:h-[15.052vw] mr-[2vw] mb-[1vw]">
                <Image
                  src={'/Cards.svg'}
                  alt="Estrela do To-DO"
                  width={262}
                  height={289}
                  priority                
                />

                <div className="flex absolute w-full h-full items-center justify-center">
                  <Image
                    className="absolute md:top-[5vw] lg:top-[1vw]"
                    src={item.foto}
                    alt="Foto do usuário"
                    width={110}
                    height={111}
                    priority                
                  />
                  <h1 className="absolute md:top-[21.5vw] lg:top-[8vw] text-[#FFFFFF] md:text-[2vw] lg:text-[0.833vw] font-bold">{item.nome}</h1>
                  <h2 className="absolute md:top-[25vw] lg:top-[9.5vw] text-[#FFFFFF] md:text-[1.6vw] lg:text-[0.729vw] font-semibold opacity-[70%]">{item.position}</h2>
                  <h2 className="absolute md:top-[28vw] lg:top-[11vw] text-[#FFFFFF] md:text-[1.6vw] lg:text-[0.729vw] font-normal opacity-[80%]">{item.email}</h2>
                </div>
              </div>
            )
          })}
        </div>
      </Pagina>
    </>
  );
}
