import { hashPassword } from "@/lib/crypto"
import { User } from "@/types/user.type"
import { supabase, Collection } from "./supabase/supabase.service"

export async function createUser(user: User) {
  const { data, error } = await supabase
    .from(Collection.USERS)
    .insert({
      email: user.email,
      password: await hashPassword(user.password),
    })
    .select()
    .single()

  if (error) throw error
  return data as User
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabase
    .from(Collection.USERS)
    .select("*")
    .eq("email", email)
    .single()

  if (error) throw error
  return data as User
}
