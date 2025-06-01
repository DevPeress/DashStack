'use client'

import { Header } from "@/components/header";
import { Pagina } from "@/components/pagina";
import { SideBar } from "@/components/sidebar";
import { useEffect, useState } from "react";

import Image from "next/image" 
import toast from "react-hot-toast";

interface Lista {
  verify: boolean,
  fav: boolean,
  texto: string,
  id: number
}

export default function Home() {
  const [texto,setTexto] = useState<string>("")
  const [lista,setLista] = useState<Lista[]>([])
  const [acao,setAcao] = useState<boolean>(false)

  const alterarFav = async (index: number, id: number) => {
    const isFav = lista[index].fav;
    const verify = fetch('api/todo', {
      method: "POST",
      body: JSON.stringify({ 
        id,
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
        success: <b>{isVerify ? "Retirado dos favoritos" : "Adicionado aos favoritos"}</b>,
        error: <b>Problema ao efetuar a troca</b>,
      }
    );
    
    setLista((prevDados) =>
      prevDados.map((item, i) =>
        i === index ? { ...item, verify: !item.verify } : item
      )
    );
  };

  const apagar = async (index: number, id: number) => {
    const verify = fetch('api/todo', {
      method: "DELETE",
      body: JSON.stringify({ id }),
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
          {typeof lista === "object" && lista.length > 0 && lista.map((item, index) => {
            const verify = item.verify

            return (
              <div key={index} className="flex relative w-full min-h-[4.844vw] h-auto border-[0.063vw] border-[#313D4F] rounded-[0.625vw] items-center justify-center overflow-hidden mb-[.75vw]" style={{ background: verify ? '#4880FF' : '#273142' }}> 
                <div className="flex absolute left-[2vw] w-[1.563vw] h-[1.563vw] border-[0.104vw] rounded items-center justify-center" onClick={() => alterarCheck(index, item.id)} style={{ background: verify ? '' : '#323D50', borderColor: verify ? '#FFFFFF' : '#313D4F' }}>
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
                        onClick={() => apagar(index, item.id)}
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
                        onClick={() => alterarFav(index, item.id)}
                      />

                      <Image
                        className="select-none hover:scale-110"
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
