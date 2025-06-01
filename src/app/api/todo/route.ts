import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) return NextResponse.json({ mensagem: "Não autorizado." },{ status: 401 });

    const { id } = session.user as { id: string };
    
    try {
        const conta = await prisma.usuario.findUnique({
            where: { id: id }
        })

        if (!conta) {
            return NextResponse.json({ status: 400, mensagem: "Conta não encontrada!" }, { status: 400})
        }

        return NextResponse.json({ status: 200, mensagem: conta.todo }, { status: 200 })
    } catch(error) {
        console.error("[GET To-Do]: ", error)
    } finally {
        await prisma.$disconnect()
    }
}

export async function POST(req: Request) {
    const body = await req.json();
    const { idt, modo } = body;

    const session = await getServerSession(authOptions);

    if (!session) return { redirect: "/login" };

    const { id } = session.user as { id: string };

    try {
        const conta = await prisma.usuario.findUnique({
            where: { id: id },
        });

        if (!conta) {
            return NextResponse.json({ mensagem: "Conta não encontrada!" }, { status: 404 });
        }

        const todo = (Array.isArray(conta.todo) ? conta.todo : []) as { id: number, texto: string, verify: boolean, fav: boolean }[];

        if (modo === "Fav") {
            const novoTodo = todo.map((item) => item.id === idt ? { ...item, fav: !item.fav } : item )

            const updated = await prisma.usuario.update({
                where: { id: id },
                data: { todo: novoTodo },
            });

            return NextResponse.json({mensagem: "To-do atualizado com sucesso!",updated },{ status: 200 });
        } else if (modo === "Verify") {
            const novoTodo = todo.map((item) => item.id === idt ? { ...item, verify: !item.verify } : item )

            const updated = await prisma.usuario.update({
                where: { id: id },
                data: { todo: novoTodo },
            });

            return NextResponse.json({mensagem: "To-do atualizado com sucesso!",updated },{ status: 200 });
        }

        return NextResponse.json({ mensagem: "Conta não encontrada!" }, { status: 404 });
    } catch (error) {
        console.error("[POST To-Do]: ", error);
        return NextResponse.json({ mensagem: "Erro interno ao atualizar o to-do." },{ status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function PUT(req: Request) {
    const body = await req.json();
    const { texto } = body;

    const session = await getServerSession(authOptions);

    if (!session) return { redirect: "/login" };

    const { id } = session.user as { id: string };

    try {
        const conta = await prisma.usuario.findUnique({
            where: { id: id },
        });

        if (!conta) {
            return NextResponse.json({ mensagem: "Conta não encontrada!" }, { status: 404 });
        }

        const todo = (Array.isArray(conta.todo) ? conta.todo : []) as { id: number, texto: string, verify: boolean, fav: boolean }[];

        const ultimoId = todo.length > 0 && typeof todo[todo.length - 1].id === "number" ? todo[todo.length - 1].id : 0;
        const novoId = ultimoId + 1;

        const novoTodo = [
            ...todo,
            { id: novoId, verify: false, fav: false, texto },
        ];

        const updated = await prisma.usuario.update({
            where: { id: id },
            data: { todo: novoTodo },
        });

        return NextResponse.json({mensagem: "To-do atualizado com sucesso!",updated,id: novoId,},{ status: 200 });
    } catch (error) {
        console.error("[PUT To-Do]: ", error);
        return NextResponse.json({ mensagem: "Erro interno ao atualizar o to-do." },{ status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function DELETE(req: Request) {
    const body = await req.json();
    const { idt } = body;

    const session = await getServerSession(authOptions);

    if (!session) return { redirect: "/login" };

    const { id } = session.user as { id: string };

    try {
        if (typeof id !== "number") {
            return NextResponse.json({ mensagem: "ID inválido." }, { status: 400 });
        }

        const conta = await prisma.usuario.findUnique({
            where: { id: id }
        })

        if (!conta) {
            return NextResponse.json({ mensagem: "Conta não encontrada!" }, { status: 404 });
        }

       const todo = (Array.isArray(conta.todo) ? conta.todo : []) as { id: number, texto: string, verify: boolean, fav: boolean }[];

        const novoTodo = todo.filter((item) => item.id !== idt);

        const updated = await prisma.usuario.update({
            where: { id: id },
            data: { todo: novoTodo }
        });

        return NextResponse.json({ mensagem: "To-do atualizado com sucesso!", updated, idt },{ status: 200 });
    } catch(error) {
        console.error("[PUT To-Do]: ", error)
        return NextResponse.json({ mensagem: "Erro interno ao atualizar o to-do." },{ status: 500 });
    } finally {
        await prisma.$disconnect()
    }
}