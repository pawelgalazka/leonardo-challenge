"use client"

import { useQuery, gql } from "@apollo/client"

import {
  Image,
  Text,
  Grid,
  Dialog,
  Flex,
  Box,
  Skeleton,
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

export function Gallery() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const [characterId, setCharacterId] = useState<string | undefined>()
  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: { page },
  })

  if (error) return <Text>Error: {error.message}</Text>

  if (loading) {
    return (
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
        gap={5}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton
            key={index}
            width="100%"
            aspectRatio={1}
            borderRadius="md"
          />
        ))}
      </Grid>
    )
  }

  return (
    <>
      <Dialog.Root
        placement="center"
        lazyMount
        size="sm"
        scrollBehavior="inside"
      >
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
          gap={8}
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
                flexDirection="column"
                gap={2}
                cursor="pointer"
              >
                <Image
                  src={character.image}
                  alt={character.name}
                  borderRadius="md"
                  aspectRatio={1}
                  objectFit="cover"
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
