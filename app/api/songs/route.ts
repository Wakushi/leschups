import { NextResponse } from "next/server"
import { getAllSongs } from "../(services)/songs.service"

export async function GET() {
  try {
    const songs = await getAllSongs()
    return NextResponse.json(songs)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch songs" },
      { status: 500 }
    )
  }
}
