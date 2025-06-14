import Image from "next/image" 

export default function NotFound() {
    return (
        <div className="flex absolute w-full h-full items-center justify-center">
            <Image
                className="absolute"
                src={'/NotFound.svg'}
                alt="Fundo da página"
                width={1920}
                height={1080}
            />

            <Image
                className="absolute"
                src={'/Details.svg'}
                alt="Fundo da página"
                width={630}
                height={735}
                priority
            />

            <h1 className="flex absolute top-[31vw] text-[1.667vw] font-bold text-[#202224]">Parece que você foi</h1>
            <button className="flex absolute top-[35vw] w-[21.771vw] h-[2.917vw] bg-[#4880FF] rounded-[0.417vw] text-[#FFFFFF] text-[1.042vw] font-bold items-center justify-center hover:scale-110">Voltar ao DashBoard</button>
        </div>
    )
}