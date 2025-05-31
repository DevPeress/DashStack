'use client'

import { Header } from "@/components/header";
import { Pagina } from "@/components/pagina";
import { SideBar } from "@/components/sidebar";
import { useState } from "react";

import Image from "next/image" 

interface Lista {
  verify: boolean,
  fav: boolean,
  texto: string
}

export default function Home() {
  const [texto,setTexto] = useState("")
  const [lista,setLista] = useState<Lista[]>([
    { verify: false, fav: false, texto: "Teste" },
    { verify: false, fav: false, texto: "Teste 2" },
  ])

  const alterarFav = (index: number) => {
    setLista((prevDados) =>
      prevDados.map((item, i) =>
        i === index ? { ...item, fav: !item.fav } : item
      )
    );
  };

   const alterarCheck = (index: number) => {
    setLista((prevDados) =>
      prevDados.map((item, i) =>
        i === index ? { ...item, verify: !item.verify } : item
      )
    );
  };

  const apagar = (index: number) => {
    setLista((prevDados) => prevDados.filter((_, i) => i !== index));
  };

  const salvar = () => {
    setLista((prevDados) => [
      ...prevDados,
      { verify:false, fav: false, texto: texto }
    ])
    setTexto("")
  }

  return (
    <>
      <Header />
      <SideBar />

      <Pagina>
        <h1 className="absolute left-[2.7vw] top-[2vw] font-bold text-[1.667vw] text-[#FFFFFF]">Add New To-Do</h1>
        <button className="absolute right-[2.7vw] top-[2vw] w-[7.656vw] h-[2.5vw] bg-[#4379EE] font-bold text-[0.729vw] text-[#FFFFFF] rounded-[0.313vw] hover:scale-115" onClick={salvar}>Salvar</button>
        <div className="flex absolute top-[6vw] w-[82vw] h-[4.844vw] bg-[#273142] border-[0.063vw] border-[#313D4F] rounded-[0.625vw] items-center justify-center">
          <input className="absolute w-[22.656vw] h-[2.083vw] p-5 left-[2vw] bg-[#323D4E] border-[0.031vw] border-[#CFCFCF] text-[0.833vw] text-[#FFFFFF] font-semibold rounded-[0.313vw] outline-0" value={texto} onChange={(e) => setTexto(e.target.value)} type="text" placeholder="Escreva aqui!" />
        </div>
        <div className="flex absolute top-[12vw] w-[82vw] max-h-[33vw] h-auto items-center justify-center overflow-x-hidden overflow-y-auto flex-wrap">
          {lista.map((item, index) => {
            const verify = item.verify

            return (
              <div key={index} className="flex relative w-full min-h-[4.844vw] h-auto border-[0.063vw] border-[#313D4F] rounded-[0.625vw] items-center justify-center overflow-hidden mb-[.75vw]" style={{ background: verify ? '#4880FF' : '#273142' }}> 
                <div className="flex absolute left-[2vw] w-[1.563vw] h-[1.563vw] border-[0.104vw] rounded items-center justify-center" onClick={() => alterarCheck(index)} style={{ background: verify ? '' : '#323D50', borderColor: verify ? '#FFFFFF' : '#313D4F' }}>
                  {verify ? 
                    <>
                      <Image
                        src={'/Shape.svg'}
                        alt="Estrela do Check"
                        width={14}
                        height={10}
                        priority
                      />
                    </> : ""
                  }
                </div>
                <div className="flex relative w-[65vw] h-auto left-[-2vw]">
                  <h1 className="flex relative w-full h-auto text-[#FFFFFF] text-[0.833vw] font-semibold mt-[.5vw] mb-[.5vw]">{item.texto}</h1>
                </div>

                <div className="flex absolute w-[4vw] right-[5vw] items-center justify-between">
                  {verify ? 
                    <> 
                      <Image
                        className="hover:scale-110"
                        src={'/Lixeira.svg'}
                        alt="Estrela do To-DO"
                        width={65}
                        height={40}
                        priority
                        onClick={() => apagar(index)}
                      />
                    </>
                    : 
                    <>
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
                    </>
                  }
                </div>
              </div>
            )
          })}
        </div>
      </Pagina>
    </>
  );
}
