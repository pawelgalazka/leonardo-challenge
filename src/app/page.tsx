/**
 * Home page component for the Rick and Morty Gallery application
 */
import { Container } from "@chakra-ui/react"

import { Gallery } from "@/components/gallery"
import { requireUserDetails } from "@/actions/user"
import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

/**
 * Metadata for the home page
 * Defines title and description for SEO
 */
export const metadata: Metadata = {
  title: "Rick and Morty Gallery",
  description: "A gallery of characters from Rick and Morty",
}

/**
 * Home page component that displays the gallery of Rick and Morty characters
 * Requires authenticated user details before rendering
 *
 * @returns Main application layout with header, gallery, and footer
 */
export default async function Home() {
  const userDetails = await requireUserDetails()

  return (
    <Container maxW="8xl" p={4}>
      <Header userDetails={userDetails} />
      <Gallery />
      <Footer />
    </Container>
  )
}
