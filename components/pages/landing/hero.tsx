import { Show } from "@/types/show.type"
import Image from "next/image"

export default function Hero({ show }: { show?: Show }) {
  return (
    <div className="relative p-4 flex items-center justify-center flex-col gap-1 min-h-[100vh] bg-countryside">
      {show ? (
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.01] backdrop-blur-sm"></div>
          <div className="w-full max-w-[450px] max-h-[80vh] z-[1] flex items-center justify-center">
            <Image
              src={show.image}
              alt={show.title}
              width={400}
              height={0}
              style={{ width: "100%", height: "auto" }}
              sizes="(max-width: 400px) 100vw, 400px"
              className="rounded"
            />
          </div>
        </>
      ) : (
        <h2 className="text-center text-2xl md:text-3xl lg:text-[2rem] drop-shadow-3xl leading-[1.2] max-w-[450px]">
          La troupe de comédie musicale des Chups vous retrouve bientôt pour de
          nouvelles aventures !
        </h2>
      )}
    </div>
  )
}
