import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { Senhas } from "../senhas";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const email: string | null = searchParams.get("email")
    const senha: string | null = searchParams.get("senha")

    if (!email || !senha) {
        return NextResponse.json({ mensagem: "Email ou senha estão incorretos!" }, { status: 404 });
    }

    try {
        const conta = await prisma.usuario.findFirst({
            where: { email: email },
        });

        if (!conta) {
            return NextResponse.json({ mensagem: "Email não possui conta!" }, { status: 404 });
        }

        const senhaProtegida = await Senhas("verificar", senha, conta.password)

        if (senhaProtegida) {
            return NextResponse.json({ mensagem: "Login liberado!" }, { status: 404 });
        }

        return NextResponse.json({ mensagem: "Email ou senha estão incorretos!" }, { status: 404 });
    } catch (error) {
        console.error("[GET Login]: ", error);
        return NextResponse.json({ mensagem: "Erro interno ao atualizar o to-do." },{ status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}