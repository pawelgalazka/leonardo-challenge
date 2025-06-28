/**
 * Pagination component for navigating through multiple pages of content
 * Uses Chakra UI pagination with Next.js router integration
 */
"use client"

import {
  ButtonGroup,
  Center,
  IconButton,
  Pagination as ChakraPagination,
} from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

/**
 * Props interface for the Pagination component
 */
interface PaginationProps {
  page: number
  totalPages: number
}

/**
 * Pagination component that displays current page and navigation controls
 * Updates URL query parameters when page changes
 *
 * @param page - Current page number
 * @param totalPages - Total number of pages available
 * @returns Centered pagination controls with previous and next buttons
 */
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
