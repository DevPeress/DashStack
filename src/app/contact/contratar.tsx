'use client'

import Image from "next/image" 
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

const userSchema = z.object({
    first: z.string().min(1, "Primeiro nome é obrigatório"),
    last: z.string().min(4, "Sobrenome é obrigatório"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(8, "Telefone inválido"),
    gender: z.enum(["Male", "Female"], { message: "Selecione um gênero válido" }),
    date: z.date(),
})

type UserSchema = z.infer<typeof userSchema>

export function Contratar() {
    const { register, handleSubmit, formState: { errors } } = useForm<UserSchema>({
        resolver: zodResolver(userSchema)
    })

    const onSubmit = (data: UserSchema) => {
        console.log(data)
        toast.success("Conta criada com sucesso!")
    }

    return (
        <div className="flex absolute w-[1540px] h-[744px] top-[5vw] bg-[#273142] rounded-[8px] items-center justify-center">
            <Image
                className="absolute top-[5vw] select-none"
                src={'/Photo.svg'}
                alt="Foto para pessoa ou vazia"
                width={80}
                height={80}
                priority
            />
            <form onSubmit={handleSubmit(onSubmit)} className="w-[780px] grid grid-cols-2 gap-8">
                <input
                    type="text"
                    placeholder="First Name"
                    className={`p-5 rounded-md outline-none text-[#B6B6B6] bg-[#323D4E] border-2 ${errors.first ? "border-pink-500" : "border-white"}`}
                    {...register("first")}
                />

                <input
                    type="text"
                    placeholder="Last Name"
                    className={`p-5 rounded-md outline-none text-[#B6B6B6] bg-[#323D4E] border-2 ${errors.last ? "border-pink-500" : "border-white"}`}
                    {...register("last")}
                />

                <input
                    type="text"
                    placeholder="Email"
                    className={`p-5 rounded-md outline-none text-[#B6B6B6] bg-[#323D4E] border-2 ${errors.email ? "border-pink-500" : "border-white"}`}
                    {...register("email")}
                />

                <input
                    type="text"
                    placeholder="Phone Number"
                    className={`p-5 rounded-md outline-none text-[#B6B6B6] bg-[#323D4E] border-2 ${errors.phone ? "border-pink-500" : "border-white"}`}
                    {...register("phone")}
                />

                <input
                    type="date"
                    placeholder="Date of Birth"
                    className={`p-5 rounded-md outline-none text-[#B6B6B6] bg-[#323D4E] border-2 ${errors.date ? "border-pink-500" : "border-white"}`}
                    {...register("date")}
                />

                <select className={`p-5 rounded-md outline-none text-[#B6B6B6] bg-[#323D4E] border-2 ${errors.date ? "border-pink-500" : "border-white"}`} {...register("gender")}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <button type="submit" className="absolute w-[780px] h-[56px] bottom-[5vw] bg-[#4880FF] text-[18px] text-[#FFFFFF] font-bold rounded-[12px]">Adicionar Agora</button>
            </form>
        </div>
    )
}