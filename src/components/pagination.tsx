"use client"

import {
  ButtonGroup,
  Center,
  IconButton,
  Pagination as ChakraPagination,
} from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

interface PaginationProps {
  page: number
  totalPages: number
}

export function Pagination({ page, totalPages }: PaginationProps) {
  const router = useRouter()

  return (
    <Center>
      <ChakraPagination.Root
        count={totalPages}
        page={page}
        onPageChange={({ page }) => router.push(`/?page=${page}`)}
      >
        <ButtonGroup gap="4" size="lg" variant="ghost">
          <ChakraPagination.PrevTrigger asChild>
            <IconButton>
              <HiChevronLeft />
            </IconButton>
          </ChakraPagination.PrevTrigger>
          <ChakraPagination.PageText />
          <ChakraPagination.NextTrigger asChild>
            <IconButton>
              <HiChevronRight />
            </IconButton>
          </ChakraPagination.NextTrigger>
        </ButtonGroup>
      </ChakraPagination.Root>
    </Center>
  )
}
