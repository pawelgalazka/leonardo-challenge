import { useQuery, gql } from "@apollo/client"

import {
  Dialog,
  Portal,
  Image,
  Button,
  DataList,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react"

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      name
      image
      status
      species
      gender
      type
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

  const stringFields = ["status", "species", "gender", "type"]

  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{data?.character?.name}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <DataList.Root>
              <DataList.Item>
                <DataList.ItemLabel>image</DataList.ItemLabel>
                <DataList.ItemValue>
                  {loading ? (
                    <Skeleton height="400px" width="100%" />
                  ) : (
                    <Image
                      src={data?.character?.image}
                      alt={data?.character?.name}
                      width="100%"
                      borderRadius="md"
                    />
                  )}
                </DataList.ItemValue>
              </DataList.Item>
              {stringFields.map((field) => (
                <DataList.Item key={field}>
                  <DataList.ItemLabel>{field}</DataList.ItemLabel>
                  <DataList.ItemValue>
                    {loading ? (
                      <SkeletonText noOfLines={1} />
                    ) : (
                      data?.character?.[field]
                    )}
                  </DataList.ItemValue>
                </DataList.Item>
              ))}
            </DataList.Root>
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
