"use client"

import { useState } from "react"
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

export function SongFormModal() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleSuccess = () => {
    setOpen(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Ajouter une chanson
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">
            Ajouter une nouvelle chanson
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <SongForm onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
