import { Show } from "@/types/show.type"
import Image from "next/image"

export default function Hero({ show }: { show?: Show }) {
  return (
    <div className="relative p-4 flex items-center justify-center flex-col gap-1 min-h-[100vh] bg-hero">
      <div className="absolute top-0 left-0 w-full h-full bg-white/[0.01] backdrop-blur-sm"></div>
      <div className="w-full max-w-[450px] max-h-[80vh] z-[1] flex items-center justify-center">
        {show ? (
          <Image
            src={show.image}
            alt={show.title}
            width={400}
            height={0}
            style={{ width: "100%", height: "auto" }}
            sizes="(max-width: 400px) 100vw, 400px"
            className="rounded"
          />
        ) : (
          <NoShowPlaceholder />
        )}
      </div>
    </div>
  )
}

function NoShowPlaceholder() {
  return (
    <Image
      src="/images/poster/bal-givre.png"
      alt="Affiche temporaire bal givré"
      width={400}
      height={0}
      style={{ width: "100%", height: "auto" }}
      sizes="(max-width: 400px) 100vw, 400px"
      className="rounded"
    />
  )
}
