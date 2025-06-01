'use client'

import Image from "next/image" 
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(4, "Senha deve ter no mínimo 4 caracteres"),
})

type LoginSchema = z.infer<typeof loginSchema>

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginSchema) => {
    const verify = fetch('api/login', {
      method: "POST",
      body: JSON.stringify({ 
        email: data.email,
        senha: data.password
      }),
    })

    await toast.promise(
      verify.then(res => {
        if (!res) throw new Error();
      }),
      {
        loading: 'Realizando o login...',
        success: <b>Login efetuado com sucesso!!</b>,
        error: <b>Email ou senha estão incorretos!</b>,
      }
    );
  }

  return (
    <div className="flex absolute w-full h-full items-center justify-center select-none">
      <Image
        className="absolute"
        src={'/NotFound.svg'}
        alt="Fundo da página"
        width={1920}
        height={1080}
      />

      <Image
        className="absolute"
        src={'/Input2.svg'}
        alt="Fundo da página"
        width={516}
        height={692}
        priority
      />

      <div className="flex absolute w-[516px] h-[692px] overflow-hidden items-center justify-center ">
        <h1 className="absolute top-[5vw] font-bold text-[32px] text-[#202224]">Logar na Conta</h1>
        <h2 className="absolute top-[7.5vw] opacity-[80%] font-semibold text-[18px] text-[#202224]">Insira email e senha para continuar!</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-80">
          <input
            type="email"
            placeholder="Email"
            className={`p-3 rounded-md border-2 outline-none text-[#A6A6A6] bg-[#F1F4F9] placeholder-gray-700 ${errors.email ? "border-pink-500" : "border-white"}`}
            {...register("email")}
          />
          {errors.email && <span className="text-pink-500 text-sm">{errors.email.message}</span>}

          <input
            type="password"
            placeholder="Senha"
            className={`p-3 rounded-md border-2 outline-none text-[#A6A6A6] bg-[#F1F4F9] placeholder-gray-700 ${errors.password ? "border-pink-500" : "border-white"}`}
            {...register("password")}
          />
          {errors.password && <span className="text-pink-500 text-sm">{errors.password.message}</span>}

          <button
            type="submit"
            className="bg-[#4880FF] text-white py-3 rounded-md tracking-widest hover:bg-pink-600 transition"
          >
            Logar
          </button>
        </form>

        <h1 className="absolute bottom-[7.5vw] font-semibold text-[18px] text-[#202224] opacity-[65%]">
          Não possui conta? <span className="text-[#5A8CFF] text-[18px] underline font-bold">Criar uma Conta</span>
        </h1>
      </div>
    </div>
  )
}
