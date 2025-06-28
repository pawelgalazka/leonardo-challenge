"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

interface UserDetails {
  username: string
  jobTitle: string
}

const schema = z.object({
  username: z.string().min(1),
  jobTitle: z.string().min(1),
})

export async function saveUser(prevState: any, formData: FormData) {
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
