"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

export interface UserDetails {
  username?: string
  jobTitle?: string
}

const schema = z.object({
  username: z.string().trim().min(1).max(20),
  jobTitle: z.string().trim().min(1).max(20),
})

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

export async function requireUserDetails() {
  const { username, jobTitle } = await getUserDetails()
  if (!username || !jobTitle) {
    redirect("/user")
  }
  return { username, jobTitle }
}
