import bcrypt from 'bcryptjs';

const criptografar = async (senha: string) => {
    const inicio = await bcrypt.genSalt(10)
    const protegida = await bcrypt.hash(senha, inicio) 
    return protegida
}

const checar = async (senha: string, senha2: string)  => {
    const match = await bcrypt.compare(senha, senha2)
    return match
}

export async function Senhas(tipo: string, senha: string, senha2?: string) {
    if (tipo === "criptografar") {
        return await criptografar(senha)
    }

    if (tipo === "verificar" && senha2) {
        return await checar(senha, senha2)
    }

    return false
}