"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Song } from "@/types/song.type"
import { Button } from "@/components/ui/button"
import {
  ArrowUpDown,
  MoreHorizontal,
  Trash2,
  Loader2,
  Music,
  Video,
  FileText,
  Edit,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { SongFormModal } from "./song-form-modal"

export const songColumns: ColumnDef<Song>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Titre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const title = row.getValue("title") as string
      return <div className="pl-4 font-medium">{title}</div>
    },
  },
  {
    accessorKey: "artist",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Artiste
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const artist = row.getValue("artist") as string
      return <div className="pl-4 font-medium">{artist}</div>
    },
  },
  {
    accessorKey: "leads",
    header: "Chanteurs principaux",
    cell: ({ row }) => {
      const leads = row.getValue("leads") as string[]
      return (
        <div className="pl-4">
          {leads && leads.length > 0 ? leads.join(", ") : "-"}
        </div>
      )
    },
  },
  {
    accessorKey: "choirs",
    header: "Chœurs",
    cell: ({ row }) => {
      const choirs = row.getValue("choirs") as string[]
      return (
        <div className="pl-4">
          {choirs && choirs.length > 0 ? choirs.join(", ") : "-"}
        </div>
      )
    },
  },
  {
    id: "resources",
    header: "Ressources",
    cell: ({ row }) => {
      const song = row.original
      const hasChoirAlto = !!song.audio_url_choir_alto
      const hasChoirSopranes = !!song.audio_url_choir_sopranes
      const hasVideo = !!song.video_url
      const hasLyrics = !!song.lyrics_url
      const hasLyricsChoir = !!song.lyrics_url_choir

      return (
        <div className="pl-4 flex items-center gap-3">
          <div className="flex flex-col items-center gap-1" title="Chœur alto">
            <Music
              className={`h-4 w-4 ${
                hasChoirAlto ? "text-green-600" : "text-gray-300"
              }`}
            />
            <span className="text-xs text-gray-500">Alto</span>
          </div>
          <div
            className="flex flex-col items-center gap-1"
            title="Chœur sopranes"
          >
            <Music
              className={`h-4 w-4 ${
                hasChoirSopranes ? "text-green-600" : "text-gray-300"
              }`}
            />
            <span className="text-xs text-gray-500">Sop.</span>
          </div>
          <div className="flex flex-col items-center gap-1" title="Vidéo">
            <Video
              className={`h-4 w-4 ${
                hasVideo ? "text-blue-600" : "text-gray-300"
              }`}
            />
            <span className="text-xs text-gray-500">Vidéo</span>
          </div>
          <div className="flex flex-col items-center gap-1" title="Paroles">
            <FileText
              className={`h-4 w-4 ${
                hasLyrics ? "text-purple-600" : "text-gray-300"
              }`}
            />
            <span className="text-xs text-gray-500">Paroles</span>
          </div>
          <div
            className="flex flex-col items-center gap-1"
            title="Paroles chœur"
          >
            <FileText
              className={`h-4 w-4 ${
                hasLyricsChoir ? "text-purple-600" : "text-gray-300"
              }`}
            />
            <span className="text-xs text-gray-500">Par. chœur</span>
          </div>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter()
      const song = row.original
      const [loading, setLoading] = useState<boolean>(false)
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
        useState<boolean>(false)
      const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false)

      async function handleDelete(): Promise<void> {
        setLoading(true)

        try {
          const response = await fetch(`/api/songs`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: song.id }),
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || "Failed to delete song")
          }

          router.refresh()
          setIsDeleteDialogOpen(false)
        } catch (error) {
          console.error("Error deleting song:", error)
          alert(
            error instanceof Error
              ? error.message
              : "Failed to delete song. Please try again."
          )
        } finally {
          setLoading(false)
        }
      }

      return (
        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Ouvrir le menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer text-blue-600 focus:text-blue-600"
                onSelect={(e) => {
                  e.preventDefault()
                  setIsEditDialogOpen(true)
                }}
              >
                <Edit className="h-4 w-4 text-blue-600" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onSelect={(e) => {
                  e.preventDefault()
                  setIsDeleteDialogOpen(true)
                }}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <SongFormModal
            song={song}
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
          />
          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-black">
                  Êtes-vous sûr ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. La chanson "{song.title}" par{" "}
                  {song.artist} sera définitivement supprimée, ainsi que tous
                  les fichiers associés (audio, vidéo, paroles).
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-black" disabled={loading}>
                  Annuler
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={loading}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Suppression...
                    </>
                  ) : (
                    "Supprimer"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )
    },
  },
]
