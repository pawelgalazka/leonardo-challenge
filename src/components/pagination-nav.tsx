"use client"

import { ButtonGroup, Center, IconButton, Pagination } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

interface PaginationNavProps {
  page: number
  totalPages: number
}

export function PaginationNav({ page, totalPages }: PaginationNavProps) {
  const router = useRouter()

  return (
    <Center>
      <Pagination.Root
        count={totalPages}
        page={page}
        onPageChange={({ page }) => router.push(`/?page=${page}`)}
      >
        <ButtonGroup gap="4" size="lg" variant="ghost">
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <HiChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>
          <Pagination.PageText />
          <Pagination.NextTrigger asChild>
            <IconButton>
              <HiChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Center>
  )
}
