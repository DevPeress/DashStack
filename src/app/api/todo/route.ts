import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const conta = await prisma.usuario.findUnique({
            where: { id: 1 }
        })

        if (!conta) {
            return NextResponse.json({ status: 400, mensagem: "Conta não encontrada!" })
        }

        return NextResponse.json({ status: 200, mensagem: conta.todo })
    } catch(error) {
        console.error("[GET To-Do]: ", error)
    } finally {
        await prisma.$disconnect()
    }
}

export async function POST(req: Request) {
    const body = await req.json();
    const { id, modo } = body;

    try {
        const conta = await prisma.usuario.findUnique({
            where: { id: 1 },
        });

        if (!conta) {
            return NextResponse.json({ mensagem: "Conta não encontrada!" }, { status: 404 });
        }

        const todo = (Array.isArray(conta.todo) ? conta.todo : []) as { id: number, texto: string, verify: boolean, fav: boolean }[];

        if (modo === "Fav") {
            const novoTodo = todo.map((item) => item.id === id ? { ...item, fav: !item.fav } : item )

            const updated = await prisma.usuario.update({
                where: { id: 1 },
                data: { todo: novoTodo },
            });

            return NextResponse.json({mensagem: "To-do atualizado com sucesso!",updated },{ status: 200 });
        } else if (modo === "Verify") {
            const novoTodo = todo.map((item) => item.id === id ? { ...item, verify: !item.verify } : item )

            const updated = await prisma.usuario.update({
                where: { id: 1 },
                data: { todo: novoTodo },
            });

            return NextResponse.json({mensagem: "To-do atualizado com sucesso!",updated },{ status: 200 });
        }

        return NextResponse.json({ mensagem: "Conta não encontrada!" }, { status: 404 });
    } catch (error) {
        console.error("[POST To-Do]: ", error);
        return NextResponse.json(
        { mensagem: "Erro interno ao atualizar o to-do." },
        { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { texto } = body;

  try {
    const conta = await prisma.usuario.findUnique({
      where: { id: 1 },
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
      where: { id: 1 },
      data: { todo: novoTodo },
    });

    return NextResponse.json(
      {
        mensagem: "To-do atualizado com sucesso!",
        updated,
        id: novoId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PUT To-Do]: ", error);
    return NextResponse.json(
      { mensagem: "Erro interno ao atualizar o to-do." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: Request) {
    const body = await req.json();
    const { id } = body;

    try {
        if (typeof id !== "number") {
            return NextResponse.json({ mensagem: "ID inválido." }, { status: 400 });
        }

        const conta = await prisma.usuario.findUnique({
            where: { id: 1 }
        })

        if (!conta) {
            return NextResponse.json({ mensagem: "Conta não encontrada!" }, { status: 404 });
        }

       const todo = (Array.isArray(conta.todo) ? conta.todo : []) as { id: number, texto: string, verify: boolean, fav: boolean }[];

        const novoTodo = todo.filter((item) => item.id !== id);

        const updated = await prisma.usuario.update({
            where: { id: 1 },
            data: { todo: novoTodo }
        });

        return NextResponse.json({ mensagem: "To-do atualizado com sucesso!", updated, id },{ status: 200 });
    } catch(error) {
        console.error("[PUT To-Do]: ", error)
        return NextResponse.json({ mensagem: "Erro interno ao atualizar o to-do." },{ status: 500 });
    } finally {
        await prisma.$disconnect()
    }
}