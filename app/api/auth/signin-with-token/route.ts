import { verifyJWT } from "@/lib/jwt"
import { NextRequest, NextResponse } from "next/server"
import { getUserByEmail } from "../../(services)/user.service"

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get(process.env.TOKEN_COOKIE as string)
  const token = cookie?.value

  try {
    if (!token) {
      return NextResponse.json({})
    }

    const payload = await verifyJWT(token)
    const user = await getUserByEmail(payload.email)

    if (!user) {
      return NextResponse.json({})
    }

    return NextResponse.json(user)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error })
  }
}
