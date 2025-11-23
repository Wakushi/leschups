import { Collection, supabase } from "./supabase/supabase.service"
import { Song, SongPayload } from "@/types/song.type"

export async function getAllSongs(): Promise<Song[]> {
  const { data, error } = await supabase.from(Collection.SONGS).select(`
    *
  `)

  if (error) throw error

  const songs = data.map((song) => ({
    ...song,
    lyrics_html: song.lyrics_html ? JSON.parse(song.lyrics_html) : null,
    lyrics_html_choir: song.lyrics_html_choir
      ? JSON.parse(song.lyrics_html_choir)
      : null,
  }))

  return songs as Song[]
}

export async function getSongById(id: number): Promise<Song | null> {
  const { data, error } = await supabase
    .from(Collection.SONGS)
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    if (error.code === "PGRST116") {
      // No rows returned
      return null
    }
    throw error
  }

  const song = {
    ...data,
    lyrics_html: data.lyrics_html ? JSON.parse(data.lyrics_html) : null,
    lyrics_html_choir: data.lyrics_html_choir
      ? JSON.parse(data.lyrics_html_choir)
      : null,
  }

  return song as Song
}

export async function createSong(
  songData: Omit<SongPayload, "id">
): Promise<Song> {
  const insertData: any = {
    ...songData,
    lyrics_html: songData.lyrics_html
      ? JSON.stringify(songData.lyrics_html)
      : null,
    lyrics_html_choir: songData.lyrics_html_choir
      ? JSON.stringify(songData.lyrics_html_choir)
      : null,
  }

  const { data, error } = await supabase
    .from(Collection.SONGS)
    .insert(insertData)
    .select()
    .single()

  if (error) throw error
  return data as Song
}

export async function deleteSong(id: number): Promise<void> {
  const { error } = await supabase.from(Collection.SONGS).delete().eq("id", id)

  if (error) throw error
}
