# 🚀 DashStack

DashStack é um sistema de gerenciamento de vendas moderno e full-stack desenvolvido com **Next.js**, **TypeScript**, **Tailwind CSS**, **Prisma** e **MySQL**. A aplicação possui autenticação baseada em cookies, painel administrativo com gráficos interativos e funcionalidades para controle de vendas, produtos e usuários.

## 🧰 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [Zod](https://zod.dev/)
- [Next Auth](https://next-auth.js.org/)

## ✨ Funcionalidades

- 🔐 Autenticação com cookies
- 📊 Painel to-do
- 👥 Cadastro e gerenciamento de usuários
- ⚙️ Integração com banco de dados via Prisma

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/DevPeress/DashStack.git
cd DashStack

# Instale as dependências
npm install

# Configure o banco de dados (MySQL) no arquivo .env
cp .env.example .env

# Rode as migrações Prisma
npx prisma migrate dev

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🔐 Variáveis de Ambiente

Configure seu `.env` com base no seguinte exemplo:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/dashstack"
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXTAUTH_SECRET="sua-chave-secreta"
```

> Você pode usar o comando `openssl rand -base64 32` para gerar um valor seguro para `NEXTAUTH_SECRET`.

## 🗂 Estrutura do Projeto

```
📁 src
 ┣ 📂 app         # Rotas e páginas (Next.js App Router)
 ┣ 📂 components  # Componentes reutilizáveis
 ┣ 📂 lib         # Funções auxiliares (cookies, auth, utils)
 ┣ 📂 styles      # Estilos globais
 ┣ 📂 prisma      # Esquema e seed do Prisma
 ┣ 📂 public      # Imagens e arquivos estáticos
```

## 🧪 Testes

> *Se estiver implementando testes, adicione instruções aqui com ferramentas como Jest, Vitest, ou Testing Library.*

## 🧠 Contribuição

Sinta-se à vontade para abrir issues ou pull requests! Qualquer feedback é bem-vindo.

```bash
# Fork o projeto
# Crie sua branch com a feature: git checkout -b minha-feature
# Commit suas mudanças: git commit -m 'feat: minha nova feature'
# Push para a branch: git push origin minha-feature
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.