'use client'

import Image from "next/image"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const userSchema = z.object({
  username: z.string().min(1, "Usuário é obrigatório"),
  password: z.string().min(4, "Senha deve ter no mínimo 4 caracteres"),
  email: z.string().email("Email inválido"),
})

type UserSchema = z.infer<typeof userSchema>

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<UserSchema>({
    resolver: zodResolver(userSchema)
  })

  const onSubmit = (data: UserSchema) => {
    console.log(data)
    toast.success("Conta criada com sucesso!")
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
        src={'/Input.svg'}
        alt="Fundo da página"
        width={516}
        height={692}
        priority
      />

      <div className="flex absolute w-[516px] h-[692px] overflow-hidden items-center justify-center ">
        <h1 className="absolute top-[5vw] font-bold text-[32px] text-[#202224]">Crie uma conta</h1>
        <h2 className="absolute top-[7.5vw] opacity-[80%] font-semibold text-[18px] text-[#202224]">Crie uma conta para poder continuar</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-80">
          <input
            type="email"
            placeholder="Email"
            className={`p-3 rounded-md border-2 outline-none text-[#A6A6A6] bg-[#F1F4F9] placeholder-gray-700 ${errors.email ? "border-pink-500" : "border-white"}`}
            {...register("email")}
          />
          {errors.email && <span className="text-pink-500 text-sm">{errors.email.message}</span>}

          <input
            type="text"
            placeholder="Usuário"
            className={`p-3 rounded-md border-2 outline-none text-[#A6A6A6] bg-[#F1F4F9] placeholder-gray-700 ${errors.username ? "border-pink-500" : "border-white"}`}
            {...register("username")}
          />
          {errors.username && <span className="text-pink-500 text-sm">{errors.username.message}</span>}

          <input
            type="password"
            placeholder="Senha"
            className={`p-3 rounded-md border-2 outline-none text-[#A6A6A6] bg-[#F1F4F9] placeholder-gray-700 ${errors.password ? "border-pink-500" : "border-white"}`}
            {...register("password")}
          />
          {errors.password && <span className="text-pink-500 text-sm">{errors.password.message}</span>}

          <button type="submit" className="bg-[#4880FF] text-white py-3 rounded-md tracking-widest hover:bg-pink-600 transition">
            SUBMIT
          </button>
        </form>

        <h1 className="absolute bottom-[5vw] font-semibold text-[18px] text-[#202224] opacity-[65%]">
          Já possui conta? <span className="text-[#5A8CFF] text-[18px] underline font-bold">Login</span>
        </h1>
      </div>
    </div>
  )
}
