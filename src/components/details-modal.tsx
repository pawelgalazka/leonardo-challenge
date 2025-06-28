import { useQuery, gql } from "@apollo/client"

import { Dialog, Portal, Image, Text, Button } from "@chakra-ui/react"

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      name
      image
    }
  }
`

interface DetailsModalProps {
  id?: string
}

export function DetailsModal({ id }: DetailsModalProps) {
  const { data, loading, error } = useQuery(GET_CHARACTER, {
    variables: { id },
    skip: !id,
  })

  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{data?.character?.name}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Image
              src={data?.character?.image}
              alt={data?.character?.name}
              borderRadius="md"
            />
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              <Button>Close</Button>
            </Dialog.ActionTrigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  )
}
