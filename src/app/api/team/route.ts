import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const team = await prisma.team.findMany()

        return NextResponse.json({ mensagem: team, status: 404 }, { status: 404 });
    } catch (error) {
        console.error("[GET Team]: ", error);
        return NextResponse.json({ mensagem: "Erro interno ao atualizar o team.", status: 404 },{ status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function PUT(req: Request) {
    const body = await req.json();
    const { nome, sobrenome, email, celular, position, genero } = body;

    try {
        const conta = prisma.usuario.findFirst({
            where: { email: email }
        })

        if (!conta) {
            return NextResponse.json({ mensagem: "Email não registrado no sistema." },{ status: 400 });
        }

        const team = prisma.team.findFirst({
            where: { email: email }
        })

        if (!team) {
            prisma.team.create({
                data: {
                    nome: nome,
                    sobrenome: sobrenome,
                    email: email,
                    celular: celular,
                    position: position,
                    genero: genero
                }
            })

            return NextResponse.json({ mensagem: "Email cadastrado!." },{ status: 201 });
        } 

        return NextResponse.json({ mensagem: "Email já cadastrado na equipe!." },{ status: 400 });
    } catch (error) {
        console.error("[PUT Team]: ", error);
        return NextResponse.json({ mensagem: "Erro interno ao atualizar o to-do." },{ status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}