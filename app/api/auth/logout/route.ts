import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" })

  response.cookies.set({
    name: process.env.TOKEN_COOKIE as string,
    value: "",
    httpOnly: true,
    maxAge: -1,
    path: "/",
  })

  return response
}
