'use client'

import { Header } from "@/components/header";
import { Pagina } from "@/components/pagina";
import { SideBar } from "@/components/sidebar";

import Image from "next/image" 

export default function Home() {
  return (
    <>
      <Header />
      <SideBar />

      <Pagina>
        <h1 className="absolute left-[2.7vw] top-[2vw] font-bold text-[32px] text-[#FFFFFF]">Team</h1>
        <button className="absolute right-[2.7vw] top-[2vw] w-[147px] h-[48px] bg-[#4379EE] font-bold text-[14px] text-[#FFFFFF] rounded-[6px] hover:scale-115">Add New Member</button>
        <div className="flex absolute top-[6vw] w-[80.208vw] max-h-[52vw] h-auto items-center justify-left overflow-x-hidden overflow-y-auto flex-wrap">
          <div className="flex relative w-[262px] h-[289px] mr-[3vw] mb-[3vw]">
            <Image
              src={'/Cards.svg'}
              alt="Estrela do To-DO"
              width={262}
              height={289}
              priority                
            />
          </div>
          <div className="flex relative w-[262px] h-[289px] mr-[3vw] mb-[3vw]">
            <Image
              src={'/Cards.svg'}
              alt="Estrela do To-DO"
              width={262}
              height={289}
              priority                
            />
          </div>
          <div className="flex relative w-[262px] h-[289px] mr-[3vw] mb-[3vw]">
            <Image
              src={'/Cards.svg'}
              alt="Estrela do To-DO"
              width={262}
              height={289}
              priority                
            />
          </div>
          <div className="flex relative w-[262px] h-[289px] mr-[3vw] mb-[3vw]">
            <Image
              src={'/Cards.svg'}
              alt="Estrela do To-DO"
              width={262}
              height={289}
              priority                
            />
          </div>
          <div className="flex relative w-[262px] h-[289px] mr-[3vw] mb-[3vw]">
            <Image
              src={'/Cards.svg'}
              alt="Estrela do To-DO"
              width={262}
              height={289}
              priority                
            />
          </div>
          
        </div>
      </Pagina>
    </>
  );
}
