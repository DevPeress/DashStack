"use client"; 

import { Toaster } from "react-hot-toast";
import { ContratarTeamProvider } from '../context/TeamContext'
import { ContratarContactProvider } from "../context/ContactContex";
import { createContext, useContext, useState, ReactNode } from "react";
import { ThemeContextType } from "@/types/types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(true);

  function toggleTheme() {
    setDark(prev => !prev);
  }

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      <html lang="pt-br" className={dark ? 'dark' : 'light'}>
        <body >
          <ContratarTeamProvider>
          <ContratarContactProvider>
            {children}

            <Toaster toastOptions={{
              style: {
                userSelect: "none"
              }
            }}/>
          </ContratarContactProvider>
        </ContratarTeamProvider>
        </body>
      </html>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro do ThemeProvider");
  }
  return context;
}