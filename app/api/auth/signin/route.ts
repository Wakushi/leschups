import { checkPassword } from "@/lib/crypto"
import { createUserJwtToken } from "@/lib/jwt"
import { getUserByEmail } from "@/app/api/(services)/user.service"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email ou mot de passe manquant",
        },
        {
          status: 400,
        }
      )
    }

    const user = await getUserByEmail(email)

    if (!user) {
      return NextResponse.json(
        {
          message: "Email non trouvé, veuillez réessayer",
        },
        {
          status: 400,
        }
      )
    }

    const isValidPassword = await checkPassword(user.password, password)

    if (!isValidPassword) {
      return NextResponse.json(
        {
          message: "Email ou mot de passe incorrect",
        },
        {
          status: 400,
        }
      )
    }

    const token = await createUserJwtToken(user)

    const response = NextResponse.json({ user })
    response.cookies.set({
      name: process.env.TOKEN_COOKIE as string,
      value: token,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return response
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error })
  }
}
