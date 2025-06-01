import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const contatos = await prisma.contacts.findMany()

        return NextResponse.json({ mensagem: contatos, status: 404 }, { status: 404 });
    } catch (error) {
        console.error("[GET Contatos]: ", error);
        return NextResponse.json({ mensagem: "Erro interno ao atualizar o team.", status: 404 },{ status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function PUT(req: Request) {
    const body = await req.json();
    const { nome, sobrenome, email, celular, date, genero } = body;

    try {
        const conta = await prisma.contacts.findFirst({
            where: { email: email }
        })

        if (!conta) {
            const team = await prisma.contacts.findFirst({
                where: { email: email }
            })

            if (!team) {
                await prisma.contacts.create({
                    data: {
                        nome: nome,
                        sobrenome: sobrenome,
                        email: email,
                        celular: celular,
                        aniversario: date,
                        genero: genero,
                        foto: '/Image.svg'
                    }
                })
            }

            return NextResponse.json({ mensagem: "Email cadastrado!.", status: 201 },{ status: 201 });
        }

        return NextResponse.json({ mensagem: "Email já cadastrado nos contatos!." },{ status: 400 });
    } catch (error) {
        console.error("[PUT Contatos]: ", error);
        return NextResponse.json({ mensagem: "Erro interno ao atualizar os contatos." },{ status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}