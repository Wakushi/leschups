import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export default function ShowPoster({
  title,
  image,
}: {
  title: string
  image: string
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="max-w-[150px] md:max-w-[250px] shadow-xl">
          <Image
            src={image}
            alt={title}
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
            sizes="100vw"
            className="rounded"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[100vh] rounded overflow-auto p-4">
        <div className="flex gap-4">
          <Image
            src={image}
            alt={title}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="rounded"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
