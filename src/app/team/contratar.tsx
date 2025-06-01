'use client'

import { createContext, useState, ReactNode } from "react";
import Image from "next/image"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

interface ContratarTeamContextProps {
    message: string;
    showConfirm: (msg: string) => Promise<UserSchema | null>;
}

interface ContratarTeamProviderProps {
    children: ReactNode;
}

const userSchema = z.object({
    first: z.string().min(1, "Primeiro nome é obrigatório"),
    last: z.string().min(4, "Sobrenome é obrigatório"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(8, "Telefone inválido"),
    gender: z.enum(["Male", "Female"], { message: "Selecione um gênero válido" }),
    position: z.string(),
})

type UserSchema = z.infer<typeof userSchema>

export const ContratarTeamContext = createContext<ContratarTeamContextProps | undefined>(undefined);

export const ContratarTeamProvider = ({ children }: ContratarTeamProviderProps) => {
    const [message, setMessage] = useState<string>("");
    const [resolveCallback, setResolveCallback] = useState<((data: UserSchema | null) => void) | null>(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<UserSchema>({
        resolver: zodResolver(userSchema)
    });

    const onSubmit = async (data: UserSchema) => {
        const verify = fetch('/api/team', {
            method: "PUT",
            body: JSON.stringify({
                nome: data.first,
                sobrenome: data.last,
                email: data.email,
                celular: data.phone,
                position: data.position,
                genero: data.gender
            }),
        });

        await toast.promise(
            verify
                .then(res => res.json())
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

        if (resolveCallback) resolveCallback(data);
        cleanup();
        reset(); // Limpa o formulário após envio
    }

    const showConfirm = (msg: string): Promise<UserSchema | null> => {
        setMessage(msg)
        return new Promise((resolve) => {
            setResolveCallback(() => resolve);
        });
    }

    const cancelar = () => {
        if (resolveCallback) resolveCallback(null);
        cleanup();
    }

    const cleanup = () => {
        setMessage("");
        setResolveCallback(null);
    };

    function formatNumero(value: string) {
        const numericValue = value.replace(/\D/g, "");

        return numericValue.replace(/(\d{1})(\d)/, "($1$2) ").replace(/(\d{5})(\d)/, "$1-$2")
    }

    return (
        <ContratarTeamContext.Provider value={{ message, showConfirm }}>
            {children}
            {message && (
                <div className="flex absolute md:w-[82.3vw] lg:w-[82.3vw] md:h-[92vw] lg:h-[38.75vw] md:top-[13vw] lg:top-[9vw] left-[15vw] bg-[#273142] rounded-[0.417vw] items-center justify-center z-50">
                    <Image
                        className="absolute md:top-[6vw] lg:top-[5vw] select-none"
                        src={'/Photo.svg'}
                        alt="Foto para pessoa ou vazia"
                        width={80}
                        height={80}
                        priority
                    />
                    <form onSubmit={handleSubmit(onSubmit)} className="md:w-[75vw] lg:w-[40.625vw] grid grid-cols-2 gap-8">
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
                            maxLength={15}
                            {...register("phone")}
                            onChange={(e) => {
                                const formatted = formatNumero(e.target.value);
                                e.target.value = formatted;
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Position"
                            className={`p-5 rounded-md outline-none text-[#B6B6B6] bg-[#323D4E] border-2 ${errors.position ? "border-pink-500" : "border-white"}`}
                            {...register("position")}
                        />
                        <select className={`p-5 rounded-md outline-none text-[#B6B6B6] bg-[#323D4E] border-2 ${errors.gender ? "border-pink-500" : "border-white"}`} {...register("gender")}>
                            <option value="">Selecione...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        <button type="submit" className="absolute w-[75vw] lg:w-[40.625vw] h-[7vw] lg:h-[2.917vw] bottom-[5vw] bg-[#4880FF] md:text-[2vw] lg:text-[0.938vw] text-[#FFFFFF] font-bold rounded-[0.625vw]">Adicionar Agora</button>
                        <button type="button" onClick={cancelar} className="absolute top-4 right-4 text-white font-bold text-lg">X</button>
                    </form>
                </div>
            )}
        </ContratarTeamContext.Provider>
    )
}

export default ContratarTeamProvider
