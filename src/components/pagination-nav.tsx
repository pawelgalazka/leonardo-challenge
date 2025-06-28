"use client"

import { ButtonGroup, Center, IconButton, Pagination } from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import { useRouter } from "next/navigation"

interface PaginationNavProps {
  page: number
  totalPages: number
}

export function PaginationNav({ page, totalPages }: PaginationNavProps) {
  const router = useRouter()

  return (
    <Center>
      <Pagination.Root count={totalPages} defaultPage={page}>
        <ButtonGroup variant="ghost" size="2xl">
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton
                variant={{ base: "ghost", _selected: "outline" }}
                onClick={() => {
                  router.push(`?page=${page.value}`)
                }}
              >
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Center>
  )
}
