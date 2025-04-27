import { Collection, supabase } from "./supabase/supabase.service"

import { ShowDate } from "@/types/show.type"

export async function getAllShowDates(): Promise<ShowDate[]> {
  const { data, error } = await supabase.from(Collection.SHOW_DATES).select(`
      *,
      show:${Collection.SHOWS}(*),
      auditorium:${Collection.AUDITORIUMS}(*)
    `)

  if (error) throw error
  return data as ShowDate[]
}
