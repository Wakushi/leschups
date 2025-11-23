import { NextRequest, NextResponse } from "next/server"
import {
  getAllSongs,
  createSong,
  getSongById,
  deleteSong,
} from "../(services)/songs.service"
import { writeFile, mkdir, unlink } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"
import { SongPayload } from "@/types/song.type"

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

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const title = formData.get("title") as string
    const artist = formData.get("artist") as string
    const leadsStr = formData.get("leads") as string
    const choirsStr = formData.get("choirs") as string
    const lyricsHtml = formData.get("lyrics_html") as string | null
    const lyricsHtmlChoir = formData.get("lyrics_html_choir") as string | null

    const audioFile = formData.get("audio_url") as File | null
    const audioChoirAltoFile = formData.get(
      "audio_url_choir_alto"
    ) as File | null
    const audioChoirSopranesFile = formData.get(
      "audio_url_choir_sopranes"
    ) as File | null
    const videoFile = formData.get("video_url") as File | null
    const lyricsFile = formData.get("lyrics_url") as File | null
    const lyricsChoirFile = formData.get("lyrics_url_choir") as File | null

    if (!title || !artist || !audioFile) {
      return NextResponse.json(
        { error: "Title, artist, and audio file are required" },
        { status: 400 }
      )
    }

    const leads = leadsStr
      ? leadsStr
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : []
    const choirs = choirsStr
      ? choirsStr
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : []

    const audioFilename = generateUniqueFilename(audioFile.name)
    const audioUrl = await saveFile(audioFile, "songs", audioFilename)

    let audioUrlChoirAlto: string | undefined
    if (audioChoirAltoFile) {
      const filename = generateUniqueFilename(audioChoirAltoFile.name)
      audioUrlChoirAlto = await saveFile(audioChoirAltoFile, "songs", filename)
    }

    let audioUrlChoirSopranes: string | undefined
    if (audioChoirSopranesFile) {
      const filename = generateUniqueFilename(audioChoirSopranesFile.name)
      audioUrlChoirSopranes = await saveFile(
        audioChoirSopranesFile,
        "songs",
        filename
      )
    }

    let videoUrl: string | undefined
    if (videoFile) {
      const filename = generateUniqueFilename(videoFile.name)
      videoUrl = await saveFile(videoFile, "video", filename)
    }

    let lyricsUrl: string | undefined
    if (lyricsFile) {
      const filename = generateUniqueFilename(lyricsFile.name)
      lyricsUrl = await saveFile(lyricsFile, "documents", filename)
    }

    let lyricsUrlChoir: string | undefined
    if (lyricsChoirFile) {
      const filename = generateUniqueFilename(lyricsChoirFile.name)
      lyricsUrlChoir = await saveFile(lyricsChoirFile, "documents", filename)
    }

    const songData: Omit<SongPayload, "id"> = {
      title,
      artist,
      leads,
      choirs,
      audio_url: audioUrl,
      audio_url_choir_alto: audioUrlChoirAlto,
      audio_url_choir_sopranes: audioUrlChoirSopranes,
      video_url: videoUrl,
      lyrics_url: lyricsUrl,
      lyrics_url_choir: lyricsUrlChoir,
      lyrics_html: lyricsHtml ? { __html: lyricsHtml } : undefined,
      lyrics_html_choir: lyricsHtmlChoir
        ? { __html: lyricsHtmlChoir }
        : undefined,
    }

    const song = await createSong(songData)

    return NextResponse.json({ success: true, song }, { status: 201 })
  } catch (error) {
    console.error("Error creating song:", error)
    return NextResponse.json(
      {
        error: "Failed to create song",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

async function saveFile(
  file: File,
  directory: string,
  filename: string
): Promise<string> {
  const uploadDir = join(process.cwd(), "public", "uploads", directory)

  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true })
  }

  const filePath = join(uploadDir, filename)
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  await writeFile(filePath, buffer)
  return `/uploads/${directory}/${filename}`
}

function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now()
  const randomStr = Math.random().toString(36).substring(2, 9)
  const extension = originalName.split(".").pop()
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "")
  const sanitizedName = nameWithoutExt.replace(/[^a-zA-Z0-9]/g, "_")
  return `${sanitizedName}_${timestamp}_${randomStr}.${extension}`
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()

    if (!id || typeof id !== "number") {
      return NextResponse.json(
        { error: "Song ID is required" },
        { status: 400 }
      )
    }

    const song = await getSongById(id)

    if (!song) {
      return NextResponse.json({ error: "Song not found" }, { status: 404 })
    }

    const filesToDelete: string[] = []

    if (song.audio_url) {
      filesToDelete.push(song.audio_url)
    }
    if (song.audio_url_choir_alto) {
      filesToDelete.push(song.audio_url_choir_alto)
    }
    if (song.audio_url_choir_sopranes) {
      filesToDelete.push(song.audio_url_choir_sopranes)
    }
    if (song.video_url) {
      filesToDelete.push(song.video_url)
    }
    if (song.lyrics_url) {
      filesToDelete.push(song.lyrics_url)
    }
    if (song.lyrics_url_choir) {
      filesToDelete.push(song.lyrics_url_choir)
    }

    for (const filePath of filesToDelete) {
      try {
        const relativePath = filePath.startsWith("/")
          ? filePath.slice(1)
          : filePath
        const absolutePath = join(process.cwd(), "public", relativePath)

        if (existsSync(absolutePath)) {
          await unlink(absolutePath)
        }
      } catch (fileError) {
        console.error(`Failed to delete file ${filePath}:`, fileError)
      }
    }

    await deleteSong(id)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error deleting song:", error)
    return NextResponse.json(
      {
        error: "Failed to delete song",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
