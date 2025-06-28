"use client"
import type { Metadata } from "next"
import { Provider } from "@/components/ui/provider"
import { Inter } from "next/font/google"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <ApolloProvider client={client}>
          <Provider>{children}</Provider>
        </ApolloProvider>
      </body>
    </html>
  )
}
