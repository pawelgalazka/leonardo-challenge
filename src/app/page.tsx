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

const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`

export default function Home() {
  const { data, loading, error } = useQuery(GET_CHARACTERS)

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  return (
    <Container maxW="8xl" p={4}>
      <Heading as="h1" size="5xl" textAlign="center" mb={5}>
        Information Page
      </Heading>

      <Grid templateColumns="repeat(4, 1fr)" gap={5}>
        {data.characters.results.map((character: any) => (
          <Dialog.Root key={character.name} placement="center">
            <Dialog.Trigger>
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
            <DetailsModal id={character.id} />
          </Dialog.Root>
        ))}
      </Grid>
    </Container>
  )
}
