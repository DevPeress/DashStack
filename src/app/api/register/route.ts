import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { Senhas } from "../senhas";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json();
    const { usuario, email, senha } = body;

    try {
        const conta = await prisma.usuario.findFirst({
            where: { email: email },
        });
        
        if (conta) {
            return NextResponse.json({ mensagem: "Email já possui conta!", status: 404 }, { status: 404 });
        }

        const senhaProtegida = await Senhas("criptografar", senha)

        if (senhaProtegida) {
            if (typeof senhaProtegida !== "string") {
                console.error("Erro ao criptografar a senha")
                return NextResponse.json({ mensagem: "Erro ao criar, fale com o administrador!", status: 500 }, { status: 500 });
            }

            await prisma.usuario.create({
                data: {
                    usuario: usuario,
                    email: email,
                    password: senhaProtegida,
                    todo: '{}'
                }
            })

            return NextResponse.json({ mensagem: "Conta criada com sucesso!", status: 201 }, { status: 201 });
        }

        return NextResponse.json({ mensagem: "Erro ao criar a conta!", status: 400 }, { status: 404 });
    } catch (error) {
        console.error("[POST Register]: ", error);
        return NextResponse.json({ mensagem: "Erro interno ao atualizar o to-do.", status: 500 },{ status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}