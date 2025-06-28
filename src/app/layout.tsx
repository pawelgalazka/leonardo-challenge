/**
 * Root layout component for the Next.js application
 * Sets up Apollo Client for GraphQL queries and Chakra UI provider
 */
"use client"

import { Provider } from "@/components/chakra/provider"
import { Inter } from "next/font/google"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

/**
 * Inter font configuration with Latin subset
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

/**
 * Apollo Client configuration for Rick and Morty GraphQL API
 */
const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
})

/**
 * Root layout component that wraps the entire application
 * Provides Apollo Client and Chakra UI context to all children
 *
 * @param children - React components to be rendered inside the layout
 */
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
