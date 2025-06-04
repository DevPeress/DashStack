export function Pagina({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <main className="flex absolute w-[87.5vw] md:h-[105.3vw] lg:h-[92.55vh] top-[7.45vh] left-[12.5vw] bg-[#1B2431] items-center justify-center overflow-hidden">
            {children}
        </main>
    )
}