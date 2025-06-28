import { Container } from "@chakra-ui/react"

import { Gallery } from "@/components/gallery"
import { requireUserDetails } from "@/actions/user"
import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Rick and Morty Gallery",
  description: "A gallery of characters from Rick and Morty",
}

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
