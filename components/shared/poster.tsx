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
      <DialogContent className="max-w-[95vw] md:max-w-3xl max-h-[90vh] flex items-center shadow-none border-transparent bg-transparent">
        <div className="relative w-full h-full flex items-center justify-center rounded overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={0}
            height={0}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "calc(90vh - 2rem)",
            }}
            sizes="(max-width: 768px) 95vw, 48rem"
            className="rounded object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
