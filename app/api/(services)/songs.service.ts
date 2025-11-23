import { Collection, supabase } from "./supabase/supabase.service"
import { Song } from "@/types/song.type"

export async function getAllSongs(): Promise<Song[]> {
  const { data, error } = await supabase.from(Collection.SONGS).select(`
    *
  `)

  if (error) throw error
  return data as Song[]
}
