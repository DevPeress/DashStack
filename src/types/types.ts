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

export interface Numeros {
  index: number,
  idt: number
}