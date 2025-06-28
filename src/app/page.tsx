"use client"

import { useQuery, gql } from "@apollo/client"

import {
  Image,
  Text,
  Grid,
  GridItem,
  Container,
  Heading,
  Dialog,
} from "@chakra-ui/react"

import { DetailsModal } from "@/components/details-modal"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { PaginationNav } from "@/components/pagination-nav"

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        pages
      }
      results {
        id
        name
        image
      }
    }
  }
`

export default function Home() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const [characterId, setCharacterId] = useState<string | undefined>()
  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: { page },
  })

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  return (
    <Container maxW="8xl" p={4}>
      <Heading as="h1" size="5xl" textAlign="center" mb={5}>
        Information Page
      </Heading>
      <Dialog.Root placement="center" lazyMount>
        <Grid templateColumns="repeat(4, 1fr)" gap={5}>
          {data.characters.results.map((character: any) => (
            <Dialog.Trigger
              key={character.id}
              onClick={() => setCharacterId(character.id)}
            >
              <GridItem
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={3}
              >
                <Image
                  src={character.image}
                  alt={character.name}
                  borderRadius="md"
                />
                <Text fontSize="md" fontWeight="bold" textAlign="center">
                  {character.name}
                </Text>
              </GridItem>
            </Dialog.Trigger>
          ))}
        </Grid>
        <DetailsModal id={characterId} />
      </Dialog.Root>
      <PaginationNav page={page} totalPages={data.characters.info.pages} />
      <footer>
        <Text fontSize="sm" textAlign="center" mt={5}>
          Challenge v3.5
        </Text>
      </footer>
    </Container>
  )
}
