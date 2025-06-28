import { UserForm } from "@/components/user-form"
import { getUserDetails } from "@/actions/user"

export default async function User() {
  const { username, jobTitle } = await getUserDetails()
  return <UserForm username={username} jobTitle={jobTitle} />
}
