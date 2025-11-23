import Image from "next/image"

export default function AboutSection() {
  return (
    <div className="relative w-auto bg-table min-h-[100vh] overflow-hidden">
      <div className="bg-[#111111b0] min-h-[100vh] w-auto relative flex items-center justify-center flex-col gap-2 px-4">
        <div className="w-full max-w-[850px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-70 rotate-10">
          <Image
            src="/images/enveloppe.png"
            alt="enveloppe"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  )
}
