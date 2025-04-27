import { NextResponse } from "next/server"
import {
  supabaseService,
  Collection,
} from "../../(services)/supabase/supabase.service"
import { ShowDateInsert } from "@/types/show.type"
import { getAllShowDates } from "../../(services)/shows.service"

export async function GET() {
  try {
    const showDates = await getAllShowDates()
    return NextResponse.json(showDates)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch show dates" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body: ShowDateInsert = await request.json()
    const showDate = await supabaseService.insert(Collection.SHOW_DATES, body)
    return NextResponse.json(showDate)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create show date" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json()
    const showDate = await supabaseService.update(
      Collection.SHOW_DATES,
      id,
      data
    )
    return NextResponse.json(showDate)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update show date" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await supabaseService.delete(Collection.SHOW_DATES, id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete show date" },
      { status: 500 }
    )
  }
}
