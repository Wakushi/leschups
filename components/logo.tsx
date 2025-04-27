import Image from "next/image"

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-[35px] h-[40px] md:w-[45px] md:h-[50px]">
        <Image
          src="/images/logo/chups_logo.png"
          alt="Chups' logo"
          width={0}
          height={0}
          style={{ width: "100%", height: "auto" }}
          sizes="100vw"
        />
      </div>
      <div className="font-neucha text-2xl md:text-3xl leading-none">
        LES CHUP'S
      </div>
    </div>
  )
}
