"use client"

import { Show } from "@/types/show.type"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"
import { FaSearch } from "react-icons/fa"

interface ShowCardProps {
  show: Show
}

export default function ShowCard({ show }: ShowCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
          <div className="aspect-[3/4] overflow-hidden">
            <Image
              src={show.image}
              alt={show.title}
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ width: "100%", height: "auto" }}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                {show.title}
              </h3>
              <div className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg">
                <FaSearch className="w-5 h-5 mr-2" />
                Voir l'affiche
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">
          Affiche du spectacle : {show.title}
        </DialogTitle>
        <Image
          src={show.image}
          alt={show.title}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className="w-full h-auto"
        />
      </DialogContent>
    </Dialog>
  )
}
