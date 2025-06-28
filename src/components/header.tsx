/**
 * Header component for the application
 * Displays user information and navigation options
 */
import { Avatar, Button, Link, Heading, Text } from "@chakra-ui/react"
import type { UserDetails } from "@/actions/user"

import { Flex } from "@chakra-ui/react"

/**
 * Props interface for the Header component
 * Requires non-nullable username and jobTitle
 */
interface HeaderProps {
  userDetails: Required<UserDetails>
}

/**
 * Header component that displays user information and app title
 * Includes user avatar, username, job title, and link to update user details
 *
 * @param userDetails - Object containing the user's username and job title
 * @returns Header component with user information and app title
 */
export function Header({ userDetails: { username, jobTitle } }: HeaderProps) {
  return (
    <header>
      <Flex
        justifyContent={{ base: "center", md: "space-between" }}
        alignItems="center"
        mb={5}
        wrap="wrap"
        gap={2}
      >
        <Flex alignItems="center" justifyContent="center" gap={2}>
          <Avatar.Root>
            <Avatar.Fallback name={username} />
          </Avatar.Root>
          <Text fontSize="md" textAlign="center">
            Username: <b>{username}</b>, Job Title: <b>{jobTitle}</b>
          </Text>
        </Flex>
        <Button asChild variant="subtle">
          <Link href="/user">Update User Details</Link>
        </Button>
      </Flex>

      <Heading as="h1" size="5xl" textAlign="center" mb={5}>
        Rick and Morty Gallery
      </Heading>
    </header>
  )
}
