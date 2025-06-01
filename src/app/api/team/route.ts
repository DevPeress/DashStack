import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const team = await prisma.team.findMany()

        return NextResponse.json({ mensagem: team, status: 404 }, { status: 404 });
    } catch (error) {
        console.error("[GET Team]: ", error);
        return NextResponse.json({ mensagem: "Erro interno ao atualizar o team.", status: 500 },{ status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function PUT(req: Request) {
    const body = await req.json();
    const { nome, sobrenome, email, celular, position, genero } = body;

    try {
        const conta = await prisma.usuario.findFirst({
            where: { email: email }
        })

        if (!conta) {
            return NextResponse.json({ mensagem: "Email não registrado no sistema." },{ status: 400 });
        }

        const team = await prisma.team.findFirst({
            where: { email: email }
        })

        if (!team) {
            await prisma.team.create({
                data: {
                    nome: nome,
                    sobrenome: sobrenome,
                    email: email,
                    celular: celular,
                    position: position,
                    genero: genero,
                    foto: '/User.svg'
                }
            })

            return NextResponse.json({ mensagem: "Email cadastrado!.", status: 201 },{ status: 201 });
        } 

        return NextResponse.json({ mensagem: "Email já cadastrado na equipe!." },{ status: 400 });
    } catch (error) {
        console.error("[PUT Team]: ", error);
        return NextResponse.json({ mensagem: "Erro interno ao atualizar o team." },{ status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}