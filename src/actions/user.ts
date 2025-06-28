/**
 * Server actions for user management
 * Handles user details storage and retrieval using cookies
 */
"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

/**
 * Interface representing user details
 */
export interface UserDetails {
  username?: string
  jobTitle?: string
}

/**
 * Zod schema for validating user details
 */
const schema = z.object({
  username: z.string().trim().min(1).max(20),
  jobTitle: z.string().trim().min(1).max(20),
})

/**
 * Server action to set user details from form submission
 * @param prevState - Previous state (for use with useFormState)
 * @param formData - Form data containing username and jobTitle
 * @returns Object with validation errors or redirects to home page on success
 */
export async function setUserDetails(prevState: any, formData: FormData) {
  const username = formData.get("username")
  const jobTitle = formData.get("jobTitle")
  const parsed = schema.safeParse({ username, jobTitle })
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }
  const cookieStore = await cookies()
  cookieStore.set("userDetails", JSON.stringify(parsed.data))
  redirect("/")
}

/**
 * Retrieves user details from cookies
 * @returns UserDetails object with username and jobTitle
 */
export async function getUserDetails(): Promise<UserDetails> {
  try {
    const cookieStore = await cookies()
    const userDetails = cookieStore.get("userDetails")
    return userDetails
      ? JSON.parse(userDetails.value)
      : { username: "", jobTitle: "" }
  } catch (error) {
    return { username: "", jobTitle: "" }
  }
}

/**
 * Ensures user details exist, redirects to user page if not
 * @returns UserDetails object if user details exist
 */
export async function requireUserDetails() {
  const { username, jobTitle } = await getUserDetails()
  if (!username || !jobTitle) {
    redirect("/user")
  }
  return { username, jobTitle }
}
