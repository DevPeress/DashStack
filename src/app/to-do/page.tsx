'use client'

import { Header } from "@/components/header";
import { Pagina } from "@/components/pagina";
import { SideBar } from "@/components/sidebar";
import { useEffect, useState } from "react";

import Image from "next/image" 
import toast from "react-hot-toast";
import { Todo } from "@/types/types";

export default function Home() {
  const [texto,setTexto] = useState<string>("")
  const [lista,setLista] = useState<Todo[]>([])
  const [acao,setAcao] = useState<boolean>(false)

  const alterarFav = async (index: number, idt: number) => {
    const isFav = lista[index].fav;
    const verify = fetch('api/todo', {
      method: "POST",
      body: JSON.stringify({ 
        idt,
        modo: "Fav"
      }),
    })
      
    await toast.promise(
      verify.then(res => {
        if (!res) throw new Error();
      }),
      {
        loading: 'Efetuando a troca...',
        success: <b>{isFav ? "Retirado dos favoritos" : "Adicionado aos favoritos"}</b>,
        error: <b>Problema ao efetuar a troca</b>,
      }
    );

    setLista((prevDados) =>
      prevDados.map((item, i) =>
        i === index ? { ...item, fav: !item.fav } : item
      )
    );
  };

   const alterarCheck = async (index: number, id: number) => {
    const isVerify = lista[index].verify;
    const verify = fetch('api/todo', {
      method: "POST",
      body: JSON.stringify({ 
        id,
        modo: "Verify"
      }),
    })
      
    await toast.promise(
      verify.then(res => {
        if (!res) throw new Error();
      }),
      {
        loading: 'Efetuando a troca...',
        success: <b>{isVerify ? "Retirado dos finalizados" : "Adicionado aos finalizados"}</b>,
        error: <b>Problema ao efetuar a troca</b>,
      }
    );
    
    setLista((prevDados) =>
      prevDados.map((item, i) =>
        i === index ? { ...item, verify: !item.verify } : item
      )
    );
  };

  const apagar = async (index: number, idt: number) => {
    const verify = fetch('api/todo', {
      method: "DELETE",
      body: JSON.stringify({ idt }),
    })
      
    await toast.promise(
      verify.then(res => {
        if (!res) throw new Error();
      }),
      {
        loading: 'Adicionando...',
        success: <b>Tarefa Adicionada!</b>,
        error: <b>Problema ao adicionar tarefa!</b>,
      }
    );
    
    return setLista((prevDados) => prevDados.filter((_, i) => i !== index));
  };

  const salvar = async () => {
    if (acao) {
      if (texto.length < 1) {
        return toast.error("Precisa conter algum a fazer!!")
      }

      let id: number = 0
      const verify = fetch('api/todo', {
        method: "PUT",
        body: JSON.stringify({ texto }),
      })
      

      await toast.promise(
        verify.then(res => res.json())
        .then(data => {
          if (!data.id) throw new Error();
          id = data.id
        }),
        {
          loading: 'Adicionando...',
          success: <b>Tarefa Adicionada!</b>,
          error: <b>Problema ao adicionar tarefa!</b>,
        }
      );

      setLista((prevDados) => [
        ...prevDados,
        { id: id,verify:false, fav: false, texto: texto }
      ])

      setTexto("")
      return setAcao(false)
    } else {
      setAcao(true)
    }
  }

  useEffect(() => {
    fetch('api/todo')
    .then(res => res.json())
    .then(dados => {
      console.log(dados.mensagem.length)
      if (dados.mensagem.length > 0) {
        setLista(dados.mensagem)
      }
    })
    .catch(dados => {
      toast.error(dados.mensagem)
    })
  },[])

  return (
    <>
      <Header />
      <SideBar />

      <Pagina>
        {acao ? 
          <>
            <h1 className="absolute md:left-[2.7vw] lg:left-[2.7vw] md:top-[3vw] lg:top-[2vw] font-bold md:text-[3.2vw] lg:text-[1.667vw] text-[#FFFFFF] select-none">Add New To-Do</h1>
            <button className="absolute md:right-[2.7vw] lg:right-[2.7vw] md:top-[3vw] lg:top-[2vw] md:w-[12vw] lg:w-[7.656vw] md:h-[4vw] lg:h-[2.5vw] bg-[#4379EE] font-bold md:text-[1.4vw] lg:text-[0.729vw] text-[#FFFFFF] rounded-[0.313vw] hover:scale-115 select-none" onClick={salvar}>Salvar</button>
            <div className="flex absolute md:top-[9vw] lg:top-[6vw] w-[82vw] md:h-[5.5vw] lg:h-[4.844vw] bg-[#273142] border-[0.063vw] border-[#313D4F] rounded-[0.625vw] items-center justify-center select-none">
              <input className="absolute md:w-[35vw] lg:w-[22.656vw] md:h-[3.5vw] lg:h-[2.083vw] md:p-3 lg:p-5 left-[2vw] bg-[#323D4E] border-[0.031vw] border-[#CFCFCF] md:text-[1.6vw] lg:text-[0.833vw] text-[#FFFFFF] font-semibold rounded-[0.313vw] outline-0" value={texto} onChange={(e) => setTexto(e.target.value)} type="text" placeholder="Escreva aqui!" />
            </div>
          </> 
          
          : 
          
          <>
            <h1 className="absolute md:left-[2.7vw] lg:left-[2.7vw] md:top-[3vw] lg:top-[2vw] font-bold md:text-[3.2vw] lg:text-[1.667vw] text-[#FFFFFF] select-none">To-Do List</h1>
            <button className="absolute md:right-[2.7vw] lg:right-[2.7vw] md:top-[3vw] lg:top-[2vw] md:w-[12vw] lg:w-[7.656vw] md:h-[4vw] lg:h-[2.5vw] bg-[#4379EE] font-bold md:text-[1.4vw] lg:text-[0.729vw] text-[#FFFFFF] rounded-[0.313vw] hover:scale-115 select-none" onClick={salvar}>Add New Tesk</button>
          </>
        }

        <div className="flex absolute md:w-[82vw] lg:w-[82vw] md:max-h-[38vw] lg:max-h-[33vw] md:top-[15vw] lg:top-[12vw] h-auto items-center justify-center overflow-x-hidden overflow-y-auto flex-wrap">
          {typeof lista === "object" && lista.length > 0 && lista.map((item, index) => {
            const verify = item.verify

            return (
              <div key={index} className="flex relative w-full md:min-h-[5.5vw] lg:min-h-[4.844vw] h-auto border-[0.063vw] border-[#313D4F] rounded-[0.625vw] items-center justify-center overflow-hidden mb-[.75vw]" style={{ background: verify ? '#4880FF' : '#273142' }}> 
                <div className="flex absolute md:left-[2vw] lg:left-[2vw] md:w-[1.563vw] lg:w-[1.563vw] md:h-[1.562vw] lg:h-[1.563vw] border-[0.104vw] rounded items-center justify-center" onClick={() => alterarCheck(index, item.id)} style={{ background: verify ? '' : '#323D50', borderColor: verify ? '#FFFFFF' : '#313D4F' }}>
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
                  <h1 className="flex relative w-full h-auto text-[#FFFFFF] md:text-[1.6vw] lg:text-[0.833vw] font-semibold mt-[.5vw] mb-[.5vw]">{item.texto}</h1>
                </div>

                <div className="flex absolute md:w-[8vw] lg:w-[5vw] right-[5vw] items-center justify-between">
                  {verify ? 
                    <> 
                      <Image
                        className="md:w-[6vw] lg:w-[4vw] select-none hover:scale-110"
                        src={'/Lixeira.svg'}
                        alt="Estrela do To-DO"
                        width={65}
                        height={40}
                        priority
                        onClick={() => apagar(index, item.id)}
                      />
                    </>
                    : 
                    <>
                      <Image
                        className="md:w-[3vw] lg:w-[2vw] select-none hover:scale-110"
                        src={item.fav ? '/Star-F.svg' : '/Star.svg'}
                        alt="Estrela do To-DO"
                        width={26}
                        height={26}
                        priority
                        onClick={() => alterarFav(index, item.id)}
                      />

                      <Image
                        className="md:w-[3vw] lg:w-[2vw] select-none hover:scale-110"
                        src="/Delete Todo.svg"
                        alt="Delete do To-DO"
                        width={30}
                        height={30}
                        priority
                        onClick={() => apagar(index, item.id)}
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
