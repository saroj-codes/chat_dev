'use client'
import { QueryProvider } from "./query-provider"

export const MainComponent =({children}:{children:any})=>{
    return (
        <html>
        <body>
        <QueryProvider>{children}</QueryProvider>
        </body>
        </html>
    )
}