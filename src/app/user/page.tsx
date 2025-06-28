"use client"

import { useActionState, useEffect, useState } from "react"
import { Button, Card, Center, Field, Input, Text } from "@chakra-ui/react"
import { getUserDetails, saveUser } from "@/actions/user"

export default function User() {
  const [username, setUsername] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [mounted, setMounted] = useState(false)

  const [state, formAction, isPending] = useActionState(saveUser, {
    errors: {},
  })

  useEffect(() => {
    async function fetchUserDetails() {
      const userDetails = await getUserDetails()
      if (userDetails.username) setUsername(userDetails.username)
      if (userDetails.jobTitle) setJobTitle(userDetails.jobTitle)
    }
    fetchUserDetails()
    setMounted(true)
  }, [])

  return (
    <Center h="100vh">
      <form action={formAction}>
        <Card.Root width="500px" p={4}>
          <Card.Header>
            <Card.Title>User Details</Card.Title>
          </Card.Header>
          <Card.Body>
            {!mounted && <Text>Loading data...</Text>}
            <Field.Root invalid={!!state.errors.username}>
              <Field.Label>Username</Field.Label>
              <Input
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {state.errors.username && (
                <Field.ErrorText>
                  {state.errors.username.join(", ")}
                </Field.ErrorText>
              )}
            </Field.Root>
            <Field.Root invalid={!!state.errors.jobTitle}>
              <Field.Label>Job Title</Field.Label>
              <Input
                name="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              {state.errors.jobTitle && (
                <Field.ErrorText>
                  {state.errors.jobTitle.join(", ")}
                </Field.ErrorText>
              )}
            </Field.Root>
          </Card.Body>
          <Card.Footer display="flex" justifyContent="flex-end">
            <Button type="submit">Save</Button>
          </Card.Footer>
        </Card.Root>
      </form>
    </Center>
  )
}
