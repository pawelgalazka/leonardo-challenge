"use client"

import { useQuery, gql } from "@apollo/client"

import { Image, Text, Grid, Dialog, Flex, Box } from "@chakra-ui/react"

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

export function Gallery() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const [characterId, setCharacterId] = useState<string | undefined>()
  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: { page },
  })

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  return (
    <>
      <Dialog.Root placement="center" lazyMount>
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
          gap={5}
        >
          {data.characters.results.map((character: any) => (
            <Dialog.Trigger
              asChild
              key={character.id}
              onClick={() => setCharacterId(character.id)}
            >
              <Flex
                as="button"
                justifyContent="flex-start"
                alignItems="center"
                flexDirection="column"
                gap={2}
                cursor="pointer"
              >
                <Image
                  src={character.image}
                  alt={character.name}
                  borderRadius="md"
                />
                <Text fontSize="md" fontWeight="bold" textAlign="center">
                  {character.name}
                </Text>
              </Flex>
            </Dialog.Trigger>
          ))}
        </Grid>
        <DetailsModal id={characterId} />
      </Dialog.Root>
      <Box mt={10}>
        <PaginationNav page={page} totalPages={data.characters.info.pages} />
      </Box>
    </>
  )
}
