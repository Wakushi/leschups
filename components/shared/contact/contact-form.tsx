"use client"

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
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FaPaperPlane } from "react-icons/fa"
import { useState } from "react"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, { message: "Nom trop court, 2 caractères minimum." }),
  email: z.string().email({ message: "Email invalide." }),
  subject: z.string().optional(),
  message: z
    .string()
    .min(10, { message: "Message trop court, 10 caractères minimum." }),
})

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(formValues: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })
      const data = await response.json()
      if (data.success) {
        toast.success("Message envoyé avec succès !")
        contactForm.reset()
      } else {
        toast.error("Une erreur est survenue. Veuillez réessayer.")
      }
    } catch (error) {
      console.error(error)
      toast.error("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...contactForm}>
      <form
        onSubmit={contactForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={contactForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-emerald-50">Nom *</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white/10 border-emerald-200/20 text-emerald-50 placeholder:text-emerald-200/50 focus:border-emerald-400"
                    placeholder="Votre nom"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-amber-300" />
              </FormItem>
            )}
          />
          <FormField
            control={contactForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-emerald-50">Email *</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white/10 border-emerald-200/20 text-emerald-50 placeholder:text-emerald-200/50 focus:border-emerald-400"
                    placeholder="votre@email.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-amber-300" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={contactForm.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-emerald-50">Sujet</FormLabel>
              <FormControl>
                <Input
                  className="bg-white/10 border-emerald-200/20 text-emerald-50 placeholder:text-emerald-200/50 focus:border-emerald-400"
                  placeholder="Sujet de votre message"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-amber-300" />
            </FormItem>
          )}
        />

        <FormField
          control={contactForm.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-emerald-50">Message *</FormLabel>
              <FormControl>
                <Textarea
                  className="bg-white/10 border-emerald-200/20 text-emerald-50 placeholder:text-emerald-200/50 focus:border-emerald-400 min-h-[150px]"
                  placeholder="Votre message..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-amber-300" />
            </FormItem>
          )}
        />

        <p className="text-sm text-center text-emerald-200/70">
          * Champs obligatoires
        </p>

        <Button
          type="submit"
          className="bg-amber-500 hover:bg-amber-400 text-white transition-colors duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Envoi en cours..."
          ) : (
            <>
              <FaPaperPlane className="w-4 h-4 mr-2" />
              Envoyer le message
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
