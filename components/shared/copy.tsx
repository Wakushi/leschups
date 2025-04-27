"use client"

import { useState } from "react"
import { FaCopy, FaCheck } from "react-icons/fa"
import { toast } from "sonner"

interface CopyProps {
  contentToCopy: string
}

export default function Copy({ contentToCopy }: CopyProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contentToCopy)
      setCopied(true)
      toast.success("Copié dans le presse-papier !")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Erreur lors de la copie")
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="text-emerald-200 hover:text-emerald-100 transition-colors"
      aria-label="Copier"
    >
      {copied ? (
        <FaCheck className="w-4 h-4" />
      ) : (
        <FaCopy className="w-4 h-4" />
      )}
    </button>
  )
}
