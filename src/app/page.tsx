import {
  Text,
  Container,
  Heading,
  Button,
  Link,
  Flex,
  Avatar,
} from "@chakra-ui/react"

import { Gallery } from "@/components/gallery"
import { requireUserDetails } from "@/actions/user"

export default async function Home() {
  const { username, jobTitle } = await requireUserDetails()

  return (
    <Container maxW="8xl" p={4}>
      <Flex
        justifyContent={{ base: "center", md: "space-between" }}
        alignItems="center"
        mb={5}
        wrap="wrap"
        gap={2}
      >
        <Flex alignItems="center" justifyContent="center" gap={2}>
          <Avatar.Root>
            <Avatar.Fallback name={username} />
          </Avatar.Root>
          <Text fontSize="md" textAlign="center">
            Username: <b>{username}</b>, Job Title: <b>{jobTitle}</b>
          </Text>
        </Flex>
        <Button asChild variant="subtle">
          <Link href="/user">Update User Details</Link>
        </Button>
      </Flex>

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
