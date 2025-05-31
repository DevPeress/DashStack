export function Pagina({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <main className="flex absolute w-[85.417vw] h-[52.604vw] top-[3.646vw] left-[12.5vw] bg-[#1B2431] items-center justify-center">
            {children}
        </main>
    )
}