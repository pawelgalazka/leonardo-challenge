"use client"

import { useActionState, useState } from "react"
import { Button, Card, Center, Field, Input, Link } from "@chakra-ui/react"
import { setUserDetails } from "@/actions/user"
import type { UserDetails } from "@/actions/user"

interface UserFormProps {
  userDetails: UserDetails
}

export function UserForm({
  userDetails: { username = "", jobTitle = "" },
}: UserFormProps) {
  const [usernameState, setUsername] = useState(username)
  const [jobTitleState, setJobTitle] = useState(jobTitle)
  const hasInitialValues = username !== "" && jobTitle !== ""

  const [state, formAction, isPending] = useActionState(setUserDetails, {
    errors: {},
  })

  return (
    <Center h="100vh">
      <form action={formAction}>
        <Card.Root width="500px" p={4}>
          <Card.Header>
            <Card.Title>User Details</Card.Title>
          </Card.Header>
          <Card.Body display="flex" flexDirection="column" gap={6}>
            <Field.Root invalid={!!state.errors.username}>
              <Field.Label>Username</Field.Label>
              <Input
                name="username"
                value={usernameState}
                maxLength={20}
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
                value={jobTitleState}
                maxLength={20}
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
            {hasInitialValues && (
              <Button asChild variant="outline">
                <Link href="/">Cancel</Link>
              </Button>
            )}
            <Button type="submit" loading={isPending}>
              Save
            </Button>
          </Card.Footer>
        </Card.Root>
      </form>
    </Center>
  )
}
