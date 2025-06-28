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
  id: string
}

export function DetailsModal({ id }: DetailsModalProps) {
  // const { data, loading, error } = useQuery(GET_CHARACTER, {
  //   variables: { id },
  // })

  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Test</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>Test</Dialog.Body>
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
