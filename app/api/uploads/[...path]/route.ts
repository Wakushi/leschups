import { NextRequest, NextResponse } from "next/server"
import { readFile, stat } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params
    const filePath = path.join("/")

    if (filePath.includes("..") || filePath.startsWith("/")) {
      return NextResponse.json({ error: "Invalid file path" }, { status: 400 })
    }

    const fullPath = join(process.cwd(), "public", "uploads", filePath)

    if (!existsSync(fullPath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    const fileStats = await stat(fullPath)
    const fileSize = fileStats.size
    const contentType = getContentType(filePath)

    const rangeHeader = req.headers.get("range")

    if (rangeHeader) {
      const rangeMatch = rangeHeader.match(/bytes=(\d+)-(\d*)/)

      if (rangeMatch) {
        const start = parseInt(rangeMatch[1], 10)
        const end = rangeMatch[2] ? parseInt(rangeMatch[2], 10) : fileSize - 1
        const chunkSize = end - start + 1

        if (start >= fileSize || end >= fileSize || start > end) {
          return new NextResponse(null, {
            status: 416,
            headers: {
              "Content-Range": `bytes */${fileSize}`,
            },
          })
        }

        const fileHandle = await import("fs/promises").then((m) =>
          m.open(fullPath, "r")
        )
        const buffer = Buffer.alloc(chunkSize)
        await fileHandle.read(buffer, 0, chunkSize, start)
        await fileHandle.close()

        return new NextResponse(buffer, {
          status: 206,
          headers: {
            "Content-Type": contentType,
            "Content-Length": chunkSize.toString(),
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        })
      }
    }

    const fileBuffer = await readFile(fullPath)

    return new NextResponse(Buffer.from(fileBuffer), {
      headers: {
        "Content-Type": contentType,
        "Content-Length": fileBuffer.length.toString(),
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("Error serving file:", error)
    return NextResponse.json({ error: "Failed to serve file" }, { status: 500 })
  }
}

function getContentType(filePath: string): string {
  const extension = filePath.split(".").pop()?.toLowerCase()

  const contentTypes: Record<string, string> = {
    mp3: "audio/mpeg",
    wav: "audio/wav",
    ogg: "audio/ogg",
    m4a: "audio/mp4",
    mp4: "video/mp4",
    webm: "video/webm",
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
  }

  return contentTypes[extension || ""] || "application/octet-stream"
}
