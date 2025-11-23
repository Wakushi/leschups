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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FaSignInAlt } from "react-icons/fa"
import { useState } from "react"
import { toast } from "sonner"
import { useUser } from "@/providers/user-store"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({ message: "Email invalide." }),
  password: z
    .string()
    .min(6, { message: "Mot de passe trop court, 6 caractères minimum." }),
})

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useUser()

  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(formValues: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const { email, password } = formValues

      console.log(email, password)

      await login(email, password)
    } catch (error) {
      console.error(error)
      toast.error("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...loginForm}>
      <form
        onSubmit={(e: any) => {
          e.preventDefault()
          loginForm.handleSubmit(onSubmit)(e)
        }}
        className="flex flex-col gap-6"
      >
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Email</FormLabel>
              <FormControl>
                <Input
                  className="bg-white/10 border-emerald-200/20 text-emerald-50 placeholder:text-emerald-200/50 focus:border-emerald-400"
                  placeholder="votre@email.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Mot de passe</FormLabel>
              <FormControl>
                <Input
                  className="bg-white/10 border-emerald-200/20 text-emerald-50 placeholder:text-emerald-200/50 focus:border-emerald-400"
                  placeholder="Votre mot de passe"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-tertiary hover:bg-tertiary-dark text-white transition-colors duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          ) : (
            <>
              <FaSignInAlt className="w-4 h-4" />
              Se connecter
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
