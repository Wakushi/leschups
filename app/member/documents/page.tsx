"use client"
import { ReactElement, useState } from "react"
import { IoMdDownload } from "react-icons/io"
import { IoCalendarSharp, IoDocumentTextOutline } from "react-icons/io5"
import { MdOutlineAppRegistration } from "react-icons/md"
import { FaTheaterMasks, FaSearch } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  dateFiles,
  DownloadFile,
  theaterFiles,
  signInFiles,
} from "@/lib/data/documents"

export default function MemberDownloadsPage() {
  return (
    <div className="min-h-screen bg-emerald-700 pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-emerald-100/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DownloadList
              title="Planning"
              icon={<IoCalendarSharp className="text-emerald-600" />}
              description="Documents liés à l'organisation et aux dates."
              files={dateFiles}
            />
            <DownloadList
              title="Textes"
              icon={<FaTheaterMasks className="text-amber-600" />}
              description="Textes théâtre"
              files={theaterFiles}
            />
            <DownloadList
              title="Inscription"
              icon={<MdOutlineAppRegistration className="text-blue-600" />}
              description="Documents requis pour votre inscription."
              files={signInFiles}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function DownloadList({
  title,
  icon,
  description,
  files,
}: {
  title: string
  icon: ReactElement
  description: string
  files: DownloadFile[]
}) {
  const [filteredFiles, setFilteredFiles] = useState<DownloadFile[]>(files)
  const [searchTerm, setSearchTerm] = useState("")

  function handleFileFilter(keyword: string) {
    setSearchTerm(keyword)
    setFilteredFiles(
      files.filter((file) =>
        file.name.toLowerCase().includes(keyword.toLowerCase())
      )
    )
  }

  return (
    <Card className="bg-white/50 border-emerald-100/20 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
          {icon}
          <span>{title}</span>
        </CardTitle>
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="relative">
          <FaSearch className="absolute text-gray-400 left-3 top-1/2 -translate-y-1/2" />
          <Input
            className="pl-10 bg-white/70 border-emerald-100 focus:border-emerald-200 transition-colors"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => handleFileFilter(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-2">
          {filteredFiles.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              Aucun document trouvé
            </p>
          ) : (
            filteredFiles.map(({ name, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                className="group relative bg-white/70 rounded-lg p-3 hover:bg-emerald-50 transition-all duration-300 border border-emerald-100 hover:border-emerald-200"
              >
                <div className="flex items-center gap-3">
                  <div className="text-emerald-600 group-hover:text-emerald-700 transition-colors">
                    <IoDocumentTextOutline className="text-xl" />
                  </div>
                  <p className="text-sm text-gray-700 flex-1 pr-10">{name}</p>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-100 group-hover:bg-emerald-200 p-2 rounded-full transition-all duration-300">
                    <IoMdDownload className="text-sm text-emerald-700" />
                  </div>
                </div>
              </a>
            ))
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-emerald-100">
          <span>
            {filteredFiles.length} document
            {filteredFiles.length !== 1 ? "s" : ""}
          </span>
          {searchTerm && (
            <Badge
              variant="secondary"
              className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 cursor-pointer"
              onClick={() => handleFileFilter("")}
            >
              Réinitialiser
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
