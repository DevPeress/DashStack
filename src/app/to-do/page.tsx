'use client'

import { Header } from "@/components/header";
import { Pagina } from "@/components/pagina";
import { SideBar } from "@/components/sidebar";
import { useState } from "react";

import Image from "next/image" 

interface Lista {
  fav: boolean,
  texto: string
}

export default function Home() {
  const [texto,setTexto] = useState("")
  const [lista,setLista] = useState<Lista[]>([
    { fav: false, texto: "Teste" },
    { fav: false, texto: "Teste 2" },
  ])

  const alterarFav = (index: number) => {
    setLista((prevDados) =>
      prevDados.map((item, i) =>
        i === index ? { ...item, fav: !item.fav } : item
      )
    );
  };

  const apagar = (index: number) => {
    setLista((prevDados) => prevDados.filter((_, i) => i !== index));
  };

  const salvar = () => {
    setLista((prevDados) => [
      ...prevDados,
      { fav: false, texto: texto }
    ])
    setTexto("")
  }

  return (
    <>
      <Header />
      <SideBar />

      <Pagina>
        <h1 className="absolute left-[2.7vw] top-[2vw] font-bold text-[32px] text-[#FFFFFF]">Add New To-Do</h1>
        <button className="absolute right-[2.7vw] top-[2vw] w-[147px] h-[48px] bg-[#4379EE] font-bold text-[14px] text-[#FFFFFF] rounded-[6px] hover:scale-115" onClick={salvar}>Salvar</button>
        <div className="flex absolute top-[6vw] w-[1540px] h-[93px] bg-[#273142] border-[1.2px] border-[#313D4F] rounded-[12px] items-center justify-center">
          <input className="absolute w-[435px] h-[40px] p-5 left-[2vw] bg-[#323D4E] border-[.6px] border-[#CFCFCF] text-[16px] font-semibold rounded-[6px] outline-0" value={texto} onChange={(e) => setTexto(e.target.value)} type="text" placeholder="Escreva aqui!" />
        </div>
        <div className="flex absolute top-[12vw] w-[1540px] max-h-[33vw] h-auto items-center justify-center overflow-x-hidden overflow-y-auto flex-wrap">
          {lista.map((item, index) => {

            return (
              <div key={index} className="flex relative w-full min-h-[93px] h-auto bg-[#273142] border-[1.2px] border-[#313D4F] rounded-[12px] items-center justify-center overflow-hidden mb-[.75vw]">
                <div className="absolute left-[2vw] w-[30px] h-[30px] bg-[#323D50] border-[#313D4F] border-[2px] rounded"></div>
                <div className="flex relative w-[65vw] h-auto left-[-2vw]">
                  <h1 className="flex relative w-full h-auto text-[#FFFFFF] text-[16px] font-semibold mt-[.5vw] mb-[.5vw]">{item.texto}</h1>
                </div>

                <div className="flex absolute w-[4vw] right-[5vw] items-center justify-between">
                  <Image
                    className="hover:scale-110"
                    src={item.fav ? '/Star-F.svg' : '/Star.svg'}
                    alt="Estrela do To-DO"
                    width={26}
                    height={26}
                    priority
                    onClick={() => alterarFav(index)}
                  />

                  <Image
                    className="hover:scale-110"
                    src="/Delete Todo.svg"
                    alt="Delete do To-DO"
                    width={30}
                    height={30}
                    priority
                    onClick={() => apagar(index)}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </Pagina>
    </>
  );
}
