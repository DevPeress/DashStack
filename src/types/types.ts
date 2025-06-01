import {  ReactNode } from "react";

export interface Todo {
  verify: boolean,
  fav: boolean,
  texto: string,
  id: number
}

export interface Pessoas {
  nome: string,
  position?: string,
  email: string,
  foto: string
}

export interface ProviderProps {
  children: ReactNode;
}

export interface ThemeContextType {
  dark: boolean;
  toggleTheme: () => void;
}

export interface Numeros {
  index: number,
  idt: number
}

export interface Dados {
  nome: string, 
  sobrenome: string, 
  email: string, 
  celular: string, 
  genero: string,
  aniversario: string, 
  position: string
}

export interface Register {
  usuario: string,
  email: string,
  senha: string
}