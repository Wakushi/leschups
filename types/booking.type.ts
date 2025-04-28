import { ShowDate } from "./show.type"

export type BookingInsert = {
  show_date_id: number
  email: string
  name: string
  first_name: string
  adult_tickets: number
  child_tickets: number
  total_price: number
}

export type Booking = BookingInsert & {
  id: number
  show_date: ShowDate
  status: UserBookingStatus
  confirmation_id?: string
  cheque?: boolean
  cash?: boolean
  comment?: string
}

export enum UserBookingStatus {
  PENDING = "PENDING",
  DONE = "DONE",
}

export enum UserBookingStatusLabel {
  PENDING = "À traiter",
  DONE = "Traitée",
}
