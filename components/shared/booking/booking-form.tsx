import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import clsx from "clsx"
import { ShowDate } from "@/types/show.type"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Prénom trop court, 2 caractères minimum." }),
  name: z.string().min(2, { message: "Nom trop court, 2 caractères minimum." }),
  email: z.string().email({ message: "Email invalide." }),
  adultTickets: z.coerce.number(),
  childTickets: z.coerce.number(),
})

interface BookingFormProps {
  showDate: ShowDate
  setIsSuccess: (value: boolean) => void
  setIsSubmitting: (value: boolean) => void
}

export default function BookingForm({
  showDate,
  setIsSuccess,
  setIsSubmitting,
}: BookingFormProps) {
  const bookingForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      name: "",
      email: "",
      adultTickets: 1,
      childTickets: 0,
    },
  })

  async function onSubmit(formValues: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const { firstName, name, email, adultTickets, childTickets } = formValues

      const payload = {
        first_name: firstName,
        name,
        email,
        adult_tickets: adultTickets,
        child_tickets: childTickets,
        show_date: showDate,
        total_price:
          adultTickets * showDate.adult_price +
          childTickets * showDate.child_price,
      }

      const response = await fetch(`/api/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        bookingForm.reset()
      }
    } catch (error) {
      console.error(error)
      setIsSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...bookingForm}>
      <form
        onSubmit={bookingForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="text-start mb-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Réserver vos places
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Remplissez le formulaire ci-dessous
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={bookingForm.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Prénom <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Votre prénom"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={bookingForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Nom <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Votre nom"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={bookingForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                  placeholder="votre.email@exemple.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={bookingForm.control}
            name="adultTickets"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Places adultes <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                    type="number"
                    min="1"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />

          {!!showDate.child_price && (
            <FormField
              control={bookingForm.control}
              name="childTickets"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Places enfant
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                      type="number"
                      min="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="flex items-center justify-center mt-2">
          <p className="text-xs text-gray-600">
            <span className="text-red-500 mr-1">*</span> Champs obligatoires
          </p>
        </div>

        <Button
          type="submit"
          className={clsx(
            "mt-2 w-full py-6 text-base font-medium transition-all duration-200",
            {
              "opacity-70 cursor-not-allowed": !bookingForm.formState.isValid,
              "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white":
                bookingForm.formState.isValid,
            }
          )}
          disabled={
            !bookingForm.formState.isValid || bookingForm.formState.isSubmitting
          }
        >
          {bookingForm.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Traitement en cours...
            </>
          ) : (
            "Réserver"
          )}
        </Button>
      </form>
    </Form>
  )
}
