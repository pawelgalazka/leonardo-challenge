import { Text, Container, Heading, Button, Link } from "@chakra-ui/react"

import { Gallery } from "@/components/gallery"
import { requireUserDetails } from "@/actions/user"

export default async function Home() {
  await requireUserDetails()

  return (
    <Container maxW="8xl" p={4}>
      <Button asChild>
        <Link href="/user">Update User Details</Link>
      </Button>
      <Heading as="h1" size="5xl" textAlign="center" mb={5}>
        Information Page
      </Heading>

      <Gallery />

      <footer>
        <Text fontSize="sm" textAlign="center" mt={5}>
          Challenge v3.5
        </Text>
      </footer>
    </Container>
  )
}
