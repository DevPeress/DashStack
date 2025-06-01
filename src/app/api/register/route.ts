import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { Senhas } from "../senhas";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json();
    const { usuario, email, senha } = body;

    try {
        const conta = await prisma.usuario.findUnique({
            where: { id: 1 },
        });

        if (conta) {
            return NextResponse.json({ mensagem: "Email já possui conta!" }, { status: 404 });
        }

        const senhaProtegida = await Senhas("criptografar", senha)
        if (senhaProtegida) {
            prisma.usuario.create({
                data: {
                    usuario: usuario,
                    email: email,
                    senha: senhaProtegida,
                    todo: {}
                }
            })
            return NextResponse.json({ mensagem: "Conta não encontrada!" }, { status: 404 });
        }

        return NextResponse.json({ mensagem: "Erro ao criar a conta!" }, { status: 404 });
    } catch (error) {
        console.error("[POST Register]: ", error);
        return NextResponse.json({ mensagem: "Erro interno ao atualizar o to-do." },{ status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}