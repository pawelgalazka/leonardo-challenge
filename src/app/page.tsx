"use client"

import { useQuery, gql } from "@apollo/client"

import { Button, HStack, Image, Text } from "@chakra-ui/react"

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
    <HStack>
      {data.characters.results.map((character: any) => (
        <HStack key={character.id}>
          <Image src={character.image} alt={character.name} />
          <Text>{character.name}</Text>
        </HStack>
      ))}
    </HStack>
  )
}
