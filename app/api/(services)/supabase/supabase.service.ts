import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_API_KEY!
)

export enum Collection {
  SHOWS = "chups_shows",
  AUDITORIUMS = "chups_auditoriums",
  SHOW_DATES = "chups_show_dates",
  USERS = "chups_users",
  BOOKINGS = "chups_bookings",
}

export class SupabaseService {
  async getAll<T>(table: Collection): Promise<T[]> {
    const { data, error } = await supabase.from(table).select("*")

    if (error) throw error
    return data as T[]
  }

  async getById<T>(table: Collection, id: string | number): Promise<T> {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", id)
      .single()

    if (error) throw error
    return data as T
  }

  async insert<T>(table: Collection, data: Partial<T>): Promise<T> {
    const { data: inserted, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return inserted as T
  }

  async update<T>(
    table: Collection,
    id: string | number,
    data: Partial<T>
  ): Promise<T> {
    const { data: updated, error } = await supabase
      .from(table)
      .update(data)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return updated as T
  }

  async delete(table: Collection, id: string | number): Promise<void> {
    const { error } = await supabase.from(table).delete().eq("id", id)

    if (error) throw error
  }
}

export const supabaseService = new SupabaseService()
