import { Contratar } from "./contratar";
import { Header } from "@/components/header";
import { Pagina } from "@/components/pagina";
import { SideBar } from "@/components/sidebar";

export default function Home() {
  return (
    <>
      <Header />
      <SideBar />

      <Pagina>
        <h1 className="absolute left-[2.7vw] top-[2vw] font-bold text-[32px] text-[#FFFFFF]">Contact</h1>
        <button className="absolute right-[2.7vw] top-[2vw] w-[147px] h-[48px] bg-[#4379EE] font-bold text-[14px] text-[#FFFFFF] rounded-[6px] hover:scale-115">Add New Contact</button>
        <Contratar />
      </Pagina>
    </>
  );
}
