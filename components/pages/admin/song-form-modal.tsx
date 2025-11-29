"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import SongForm from "@/components/shared/songs/song-form"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Song } from "@/types/song.type"

interface SongFormModalProps {
  song?: Song
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SongFormModal({
  song,
  trigger,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: SongFormModalProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const router = useRouter()
  const isEditMode = !!song

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = controlledOnOpenChange || setInternalOpen

  const handleSuccess = () => {
    setOpen(false)
    router.refresh()
  }

  useEffect(() => {
    if (song && controlledOpen === undefined) {
      setInternalOpen(true)
    }
  }, [song, controlledOpen])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      {!trigger && !isEditMode && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4" />
            Ajouter une chanson
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">
            {isEditMode
              ? "Modifier la chanson"
              : "Ajouter une nouvelle chanson"}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <SongForm onSuccess={handleSuccess} song={song} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
