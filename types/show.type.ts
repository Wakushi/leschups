export type Show = {
  id: number
  title: string
  image: string
}

export type Auditorium = {
  id: number
  name: string
  city: string
  location_url: string
}

export type ShowDateInsert = {
  show_id: number
  date: Date | string
  adult_price: number
  child_price: number
  auditorium_id: number
  external_booking_url?: string
}

export type ShowDate = {
  id: number
  date: string
  adult_price: number
  child_price: number
  external_booking_url?: string
  show: Show
  auditorium: Auditorium
  time: string
}
