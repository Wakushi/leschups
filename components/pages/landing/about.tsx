import Image from "next/image"

export default function AboutSection() {
  return (
    <div className="relative w-auto bg-wood min-h-[100vh] overflow-hidden">
      <div className="bg-[#11111187] min-h-[100vh] w-auto relative flex items-center justify-center flex-col gap-2 px-4">
        <ChristmasTicket rotation={1} />
        <ChristmasTicket rotation={2} />
        <ChristmasTicket rotation={-2} />
        <ChristmasTicket rotation={-3} />
        <ChristmasTicket rotation={3} />
      </div>
    </div>
  )
}

function ChristmasTicket({ rotation }: { rotation: number }) {
  return (
    <div
      className="w-full max-w-[850px] absolute top-1/2 -translate-y-1/2 rotate-10 shadow-2xl"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <Image
        src="/images/assets/christmas-ticket.png"
        alt="Christmas ticket"
        width={0}
        height={0}
        style={{ width: "100%", height: "auto" }}
        sizes="100vw"
      />
    </div>
  )
}
