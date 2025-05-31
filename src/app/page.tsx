import Image from "next/image" 

export default function Home() {

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
              src={'/Input.svg'}
              alt="Fundo da página"
              width={516}
              height={692}
              priority
            />

            <div className="flex absolute w-[516px] h-[692px] overflow-hidden items-center justify-center">
              <h1 className="font-bold text-[32px] text-[#202224]">Crie uma conta</h1>
            </div>
        </div>
    )
}