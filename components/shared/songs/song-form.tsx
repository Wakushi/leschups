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
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Song } from "@/types/song.type"

const baseFormSchema = {
  title: z.string().min(1, { message: "Le titre est requis." }),
  artist: z.string().min(1, { message: "L'artiste est requis." }),
  leads: z.string().optional(),
  choirs: z.string().optional(),
  lyrics_html: z.string().optional(),
  lyrics_html_choir: z.string().optional(),
  audio_url_choir_alto: z.union([z.instanceof(File), z.literal("")]).optional(),
  audio_url_choir_sopranes: z
    .union([z.instanceof(File), z.literal("")])
    .optional(),
  video_url: z.union([z.instanceof(File), z.literal("")]).optional(),
  lyrics_url: z.union([z.instanceof(File), z.literal("")]).optional(),
  lyrics_url_choir: z.union([z.instanceof(File), z.literal("")]).optional(),
}

const createFormSchema = z.object({
  ...baseFormSchema,
  audio_url: z.union([z.instanceof(File), z.literal("")]).optional(),
})

const editFormSchema = z.object({
  ...baseFormSchema,
  audio_url: z.union([z.instanceof(File), z.literal("")]).optional(),
})

type FormValues = z.infer<typeof editFormSchema>

interface SongFormProps {
  onSuccess?: () => void
  song?: Song
}

export default function SongForm({ onSuccess, song }: SongFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditMode = !!song

  const form = useForm<FormValues>({
    resolver: zodResolver(
      isEditMode ? editFormSchema : createFormSchema
    ) as any,
    defaultValues: {
      title: song?.title || "",
      artist: song?.artist || "",
      leads: song?.leads?.join(", ") || "",
      choirs: song?.choirs?.join(", ") || "",
      lyrics_html:
        song?.lyrics_html &&
        typeof song.lyrics_html === "object" &&
        "__html" in song.lyrics_html
          ? String(song.lyrics_html.__html)
          : "",
      lyrics_html_choir:
        song?.lyrics_html_choir &&
        typeof song.lyrics_html_choir === "object" &&
        "__html" in song.lyrics_html_choir
          ? String(song.lyrics_html_choir.__html)
          : "",
    } as FormValues,
  })

  useEffect(() => {
    if (song) {
      form.reset({
        title: song.title || "",
        artist: song.artist || "",
        leads: song.leads?.join(", ") || "",
        choirs: song.choirs?.join(", ") || "",
        lyrics_html:
          song.lyrics_html &&
          typeof song.lyrics_html === "object" &&
          "__html" in song.lyrics_html
            ? String(song.lyrics_html.__html)
            : "",
        lyrics_html_choir:
          song.lyrics_html_choir &&
          typeof song.lyrics_html_choir === "object" &&
          "__html" in song.lyrics_html_choir
            ? String(song.lyrics_html_choir.__html)
            : "",
      })
    }
  }, [song, form])

  async function onSubmit(formValues: FormValues) {
    setIsSubmitting(true)

    try {
      const formData = new FormData()

      if (isEditMode && song) {
        formData.append("id", song.id.toString())
      }

      formData.append("title", formValues.title)
      formData.append("artist", formValues.artist)
      formData.append("leads", formValues.leads || "")
      formData.append("choirs", formValues.choirs || "")
      formData.append("lyrics_html", formValues.lyrics_html || "")
      formData.append("lyrics_html_choir", formValues.lyrics_html_choir || "")

      if (formValues.audio_url && formValues.audio_url instanceof File) {
        formData.append("audio_url", formValues.audio_url)
      }

      if (
        formValues.audio_url_choir_alto &&
        formValues.audio_url_choir_alto instanceof File
      ) {
        formData.append("audio_url_choir_alto", formValues.audio_url_choir_alto)
      }

      if (
        formValues.audio_url_choir_sopranes &&
        formValues.audio_url_choir_sopranes instanceof File
      ) {
        formData.append(
          "audio_url_choir_sopranes",
          formValues.audio_url_choir_sopranes
        )
      }

      if (formValues.video_url && formValues.video_url instanceof File) {
        formData.append("video_url", formValues.video_url)
      }

      if (formValues.lyrics_url && formValues.lyrics_url instanceof File) {
        formData.append("lyrics_url", formValues.lyrics_url)
      }

      if (
        formValues.lyrics_url_choir &&
        formValues.lyrics_url_choir instanceof File
      ) {
        formData.append("lyrics_url_choir", formValues.lyrics_url_choir)
      }

      const response = await fetch("/api/songs", {
        method: isEditMode ? "PUT" : "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || `Failed to ${isEditMode ? "update" : "create"} song`
        )
      }

      toast.success(
        isEditMode
          ? "Chanson modifiée avec succès!"
          : "Chanson créée avec succès!"
      )
      if (!isEditMode) {
        form.reset()
      }
      onSuccess?.()
    } catch (error) {
      console.error(error)
      toast.error(
        error instanceof Error
          ? error.message
          : `Une erreur est survenue lors de la ${
              isEditMode ? "modification" : "création"
            } de la chanson.`
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="text-start mb-2">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditMode ? "Modifier la chanson" : "Créer une nouvelle chanson"}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {isEditMode
              ? "Modifiez les informations de la chanson ci-dessous"
              : "Remplissez le formulaire ci-dessous pour ajouter une chanson"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Titre <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white border-gray-300 text-gray-800"
                    placeholder="Titre de la chanson"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="artist"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Artiste <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white border-gray-300 text-gray-800"
                    placeholder="Nom de l'artiste"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="leads"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Leads
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white border-gray-300 text-gray-800"
                    placeholder="Lead 1, Lead 2, ..."
                    {...field}
                  />
                </FormControl>
                <p className="text-xs text-gray-500">
                  Séparez les noms par des virgules
                </p>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="choirs"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Chœurs
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white border-gray-300 text-gray-800"
                    placeholder="Chœur 1, Chœur 2, ..."
                    {...field}
                  />
                </FormControl>
                <p className="text-xs text-gray-500">
                  Séparez les noms par des virgules
                </p>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="lyrics_html"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">
                Paroles HTML
              </FormLabel>
              <FormControl>
                <Textarea
                  className="bg-white border-gray-300 text-gray-800 min-h-[100px] max-h-[200px]"
                  placeholder="HTML des paroles (optionnel)"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lyrics_html_choir"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">
                Paroles HTML Chœur
              </FormLabel>
              <FormControl>
                <Textarea
                  className="bg-white border-gray-300 text-gray-800 min-h-[100px] max-h-[200px]"
                  placeholder="HTML des paroles pour le chœur (optionnel)"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Fichiers audio
          </h3>

          <FormField
            control={form.control}
            name="audio_url"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Fichier audio principal
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="audio/*"
                    className="bg-white border-gray-300 text-gray-800"
                    {...field}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      onChange(file || "")
                    }}
                  />
                </FormControl>
                {isEditMode && song?.audio_url && (
                  <p className="text-xs text-gray-500">
                    Fichier actuel: {song.audio_url.split("/").pop()}
                  </p>
                )}
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="audio_url_choir_alto"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Audio Chœur Alto
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="audio/*"
                      className="bg-white border-gray-300 text-gray-800"
                      {...field}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        onChange(file)
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="audio_url_choir_sopranes"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Audio Chœur Sopranes
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="audio/*"
                      className="bg-white border-gray-300 text-gray-800"
                      {...field}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        onChange(file)
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Fichiers vidéo et documents
          </h3>

          <FormField
            control={form.control}
            name="video_url"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Fichier vidéo
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="video/*"
                    className="bg-white border-gray-300 text-gray-800"
                    {...field}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      onChange(file)
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="lyrics_url"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Document paroles
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="bg-white border-gray-300 text-gray-800"
                      {...field}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        onChange(file)
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lyrics_url_choir"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Document paroles chœur
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="bg-white border-gray-300 text-gray-800"
                      {...field}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        onChange(file)
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="mt-4 w-full py-6 text-base font-medium bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditMode ? "Modification en cours..." : "Création en cours..."}
            </>
          ) : isEditMode ? (
            "Modifier la chanson"
          ) : (
            "Créer la chanson"
          )}
        </Button>
      </form>
    </Form>
  )
}
