"use client"

import { useQuery, gql } from "@apollo/client"

import { Image, Text, Grid, GridItem, Container } from "@chakra-ui/react"

const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
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
    <Container maxW="8xl">
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        {data.characters.results.map((character: any) => (
          <GridItem key={character.id}>
            <Image
              src={character.image}
              alt={character.name}
              borderRadius="md"
            />
            <Text fontSize="md" fontWeight="bold" textAlign="center">
              {character.name}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </Container>
  )
}
