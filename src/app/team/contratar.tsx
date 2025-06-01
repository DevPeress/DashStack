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
    position: z.string(),
})

type UserSchema = z.infer<typeof userSchema>

export function Contratar() {
    const { register, handleSubmit, formState: { errors } } = useForm<UserSchema>({
        resolver: zodResolver(userSchema)
    })

    const onSubmit = async (data: UserSchema) => {
        const verify = fetch('api/team', {
            method: "PUT",
            body: JSON.stringify({ 
                nome: data.first,
                sobrenome: data.last,
                email: data.email,
                celular: data.phone,
                position: data.position,
                genero: data.gender
            }),
            })

            await toast.promise(
            verify.then(res => res.json())
            .then(dados => {
                if (dados.status !== 201) {
                throw new Error(dados.mensagem)
                }
            }), 
            {
                loading: 'Realizando o cadastro...',
                success: <b>Cadastro realizado com sucesso!!</b>,
                error: (err) => <b>{err.message}</b>,
            }
        );
    }

    return (
        <div className="flex absolute w-[80.208vw] h-[38.75vw] top-[5vw] bg-[#273142] rounded-[0.417vw] items-center justify-center">
            <Image
                className="absolute top-[5vw] select-none"
                src={'/Photo.svg'}
                alt="Foto para pessoa ou vazia"
                width={80}
                height={80}
                priority
            />
            <form onSubmit={handleSubmit(onSubmit)} className="w-[40.625vw] grid grid-cols-2 gap-8">
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
                    type="text"
                    placeholder="Position"
                    className={`p-5 rounded-md outline-none text-[#B6B6B6] bg-[#323D4E] border-2 ${errors.position ? "border-pink-500" : "border-white"}`}
                    {...register("position")}
                />

                <select className={`p-5 rounded-md outline-none text-[#B6B6B6] bg-[#323D4E] border-2 ${errors.gender ? "border-pink-500" : "border-white"}`} {...register("gender")}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <button type="submit" className="absolute w-[40.625vw] h-[2.917vw] bottom-[5vw] bg-[#4880FF] text-[0.938vw] text-[#FFFFFF] font-bold rounded-[0.625vw]">Adicionar Agora</button>
            </form>
        </div>
    )
}