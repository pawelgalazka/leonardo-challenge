/**
 * Gallery component for displaying Rick and Morty characters
 * Fetches and displays character cards in a grid layout with pagination
 */
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
  Alert,
  SkeletonText,
} from "@chakra-ui/react"

import { DetailsModal } from "@/components/details-modal"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Pagination } from "@/components/pagination"

/**
 * GraphQL query to fetch characters with pagination
 * Returns character ID, name, and image URL
 */
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

/**
 * Gallery component that displays a grid of character cards
 * Supports pagination and opening character details in a modal
 *
 * @returns Grid of character cards with pagination controls
 */
export function Gallery() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const [characterId, setCharacterId] = useState<string | undefined>()
  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: { page },
  })

  // Display error message if query fails
  if (error)
    return (
      <Alert.Root status="error" size="lg">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Error</Alert.Title>
          <Alert.Description>{error.message}</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    )

  // Display loading skeleton while fetching data
  if (loading) {
    return (
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
        gap={8}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <Flex
            key={index}
            justifyContent="flex-start"
            flexDirection="column"
            gap={2}
          >
            <Skeleton width="100%" aspectRatio={1} borderRadius="md" />
            <SkeletonText noOfLines={1} />
          </Flex>
        ))}
      </Grid>
    )
  }

  // Render gallery grid with character cards
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
      <Box mt={5}>
        <Pagination page={page} totalPages={data.characters.info.pages} />
      </Box>
    </>
  )
}
