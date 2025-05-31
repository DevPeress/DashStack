'use client'

import { Header } from "@/components/header";
import { Pagina } from "@/components/pagina";
import { SideBar } from "@/components/sidebar";
import { useState } from "react";

import Image from "next/image" 
import toast from "react-hot-toast";

interface Lista {
  verify: boolean,
  fav: boolean,
  texto: string
}

export default function Home() {
  const [texto,setTexto] = useState<string>("")
  const [lista,setLista] = useState<Lista[]>([
    { verify: false, fav: false, texto: "Teste" },
    { verify: false, fav: false, texto: "Teste 2" },
  ])
  const [acao,setAcao] = useState<boolean>(false)

  const alterarFav = (index: number) => {
    const isFav = lista[index].fav;
    toast.success(isFav ? "Retirado dos favoritos" : "Adicionado aos favoritos");

    setLista((prevDados) =>
      prevDados.map((item, i) =>
        i === index ? { ...item, fav: !item.fav } : item
      )
    );
  };

   const alterarCheck = (index: number) => {
    const isFav = lista[index].verify;
    toast.success(isFav ? "Retirada a verificação!" : "Adicionado aos verificados");
    
    setLista((prevDados) =>
      prevDados.map((item, i) =>
        i === index ? { ...item, verify: !item.verify } : item
      )
    );
  };

  const apagar = (index: number) => {
    setLista((prevDados) => prevDados.filter((_, i) => i !== index));
    return toast.success("A fazer apagado!");
  };

  const salvar = () => {
    if (acao) {
      if (texto.length < 1) {
        return toast.error("Precisa conter algum a fazer!!")
      }
      setLista((prevDados) => [
        ...prevDados,
        { verify:false, fav: false, texto: texto }
      ])
      setTexto("")
      setAcao(false)
      return toast.success("Novo a fazer adicionado na lista!")
    } else {
      setAcao(true)
    }
  }

  return (
    <>
      <Header />
      <SideBar />

      <Pagina>
        {acao ? 
          <>
            <h1 className="absolute left-[2.7vw] top-[2vw] font-bold text-[1.667vw] text-[#FFFFFF] select-none">Add New To-Do</h1>
            <button className="absolute right-[2.7vw] top-[2vw] w-[7.656vw] h-[2.5vw] bg-[#4379EE] font-bold text-[0.729vw] text-[#FFFFFF] rounded-[0.313vw] hover:scale-115 select-none" onClick={salvar}>Salvar</button>
            <div className="flex absolute top-[6vw] w-[82vw] h-[4.844vw] bg-[#273142] border-[0.063vw] border-[#313D4F] rounded-[0.625vw] items-center justify-center select-none">
              <input className="absolute w-[22.656vw] h-[2.083vw] p-5 left-[2vw] bg-[#323D4E] border-[0.031vw] border-[#CFCFCF] text-[0.833vw] text-[#FFFFFF] font-semibold rounded-[0.313vw] outline-0" value={texto} onChange={(e) => setTexto(e.target.value)} type="text" placeholder="Escreva aqui!" />
            </div>
          </> 
          
          : 
          
          <>
            <h1 className="absolute left-[2.7vw] top-[2vw] font-bold text-[1.667vw] text-[#FFFFFF] select-none">To-Do List</h1>
            <button className="absolute right-[2.7vw] top-[2vw] w-[7.656vw] h-[2.5vw] bg-[#4379EE] font-bold text-[0.729vw] text-[#FFFFFF] rounded-[0.313vw] hover:scale-115 select-none" onClick={salvar}>Add New Tesk</button>
          </>
        }

        <div className="flex absolute w-[82vw] max-h-[33vw] h-auto items-center justify-center overflow-x-hidden overflow-y-auto flex-wrap" style={{ top: acao ? "12vw" : "5vw"}}>
          {lista.map((item, index) => {
            const verify = item.verify

            return (
              <div key={index} className="flex relative w-full min-h-[4.844vw] h-auto border-[0.063vw] border-[#313D4F] rounded-[0.625vw] items-center justify-center overflow-hidden mb-[.75vw]" style={{ background: verify ? '#4880FF' : '#273142' }}> 
                <div className="flex absolute left-[2vw] w-[1.563vw] h-[1.563vw] border-[0.104vw] rounded items-center justify-center" onClick={() => alterarCheck(index)} style={{ background: verify ? '' : '#323D50', borderColor: verify ? '#FFFFFF' : '#313D4F' }}>
                  {verify ? 
                    <>
                      <Image
                        className="select-none"
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
                        className="select-none hover:scale-110"
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
                        className="select-none hover:scale-110"
                        src={item.fav ? '/Star-F.svg' : '/Star.svg'}
                        alt="Estrela do To-DO"
                        width={26}
                        height={26}
                        priority
                        onClick={() => alterarFav(index)}
                      />

                      <Image
                        className="select-none hover:scale-110"
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
