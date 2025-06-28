import { UserForm } from "@/components/user-form"
import { getUserDetails } from "@/actions/user"
import { Metadata } from "next"
import { Container } from "@chakra-ui/react"

export const metadata: Metadata = {
  title: "User Details",
  description: "Update your user details",
}

export default async function User() {
  const userDetails = await getUserDetails()
  return (
    <Container>
      <UserForm userDetails={userDetails} />
    </Container>
  )
}
