import { UserBookingStatus } from "@/types/booking.type"
import { ShowDate } from "@/types/show.type"
import {
  Collection,
  supabase,
  supabaseService,
} from "./supabase/supabase.service"
import { getBookingTemplate, sendMail } from "./mail.service"
import { v4 as uuidv4 } from "uuid"
import { formatDate } from "@/lib/utils"

type BookingPayload = {
  show_date: ShowDate
  email: string
  name: string
  first_name: string
  adult_tickets: number
  child_tickets: number
  total_price: number
}

export async function bookShow(payload: BookingPayload): Promise<void> {
  try {
    const {
      show_date,
      email,
      name,
      first_name,
      adult_tickets,
      total_price,
      child_tickets,
    } = payload

    if (
      !show_date ||
      !email ||
      !name ||
      !first_name ||
      !adult_tickets ||
      !total_price
    ) {
      throw new Error("Missing required fields")
    }

    const booking = {
      show_date_id: show_date.id,
      email,
      name,
      first_name,
      adult_tickets,
      child_tickets,
      total_price,
      status: UserBookingStatus.PENDING,
      confirmation_id: uuidv4(),
    }

    await supabaseService.insert(Collection.BOOKINGS, booking)

    const formattedDate = formatDate(show_date.date)

    await sendMail(
      email,
      `Confirmation: Réservation pour le spectacle "${show_date.show.title}" du ${formattedDate} à ${show_date.auditorium.city}`,
      getBookingTemplate({
        confirmationId: booking.confirmation_id,
        email,
        showDate: show_date,
        formattedDate,
        totalPrice: booking.total_price,
      })
    )
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function confirmBooking(payload: {
  confirmationId: string
  email: string
}): Promise<void> {
  const { confirmationId, email } = payload

  const { data, error } = await supabase
    .from(Collection.BOOKINGS)
    .update({ status: UserBookingStatus.DONE })
    .eq("confirmation_id", confirmationId)
    .eq("email", email)
    .single()

  if (error) {
    throw error
  }

  return data
}
