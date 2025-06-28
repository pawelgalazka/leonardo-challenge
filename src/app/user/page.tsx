"use client"

import { useActionState, useState } from "react"
import { Button, Card, Center, Field, Input } from "@chakra-ui/react"
import { saveUser } from "@/actions/user"

export default function User() {
  const [username, setUsername] = useState("")
  const [jobTitle, setJobTitle] = useState("")

  const [state, formAction, isPending] = useActionState(saveUser, {
    errors: {},
  })

  return (
    <Center h="100vh">
      <form action={formAction}>
        <Card.Root width="500px" p={4}>
          <Card.Header>
            <Card.Title>User Details</Card.Title>
          </Card.Header>
          <Card.Body>
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
