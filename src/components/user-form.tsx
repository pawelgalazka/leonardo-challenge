/**
 * User form component for collecting and updating user details
 * Handles form validation and submission using server actions
 */
"use client"

import { useActionState, useState } from "react"
import {
  Button,
  Card,
  Center,
  Field,
  Input,
  Link,
  Text,
} from "@chakra-ui/react"
import { setUserDetails } from "@/actions/user"
import type { UserDetails } from "@/actions/user"

/**
 * Props interface for the UserForm component
 */
interface UserFormProps {
  userDetails: UserDetails
}

/**
 * User form component that allows users to enter or update their details
 * Uses server actions for form submission and validation
 *
 * @param userDetails - Object containing the user's current username and job title
 * @returns Form component with input fields for username and job title
 */
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
        <Card.Root p={4}>
          <Card.Header>
            <Card.Title>Hello 👋</Card.Title>
            <Card.Description>
              Please enter your details below to continue.
            </Card.Description>
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
