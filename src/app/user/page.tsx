/**
 * User details page component
 * Allows users to update their profile information
 */
import { UserForm } from "@/components/user-form"
import { getUserDetails } from "@/actions/user"
import { Metadata } from "next"
import { Container } from "@chakra-ui/react"

/**
 * Metadata for the user details page
 * Defines title and description for SEO
 */
export const metadata: Metadata = {
  title: "User Details",
  description: "Update your user details",
}

/**
 * User page component that displays the user details form
 * Fetches existing user details if available
 *
 * @returns Container with the user form component
 */
export default async function User() {
  const userDetails = await getUserDetails()
  return (
    <Container>
      <UserForm userDetails={userDetails} />
    </Container>
  )
}
