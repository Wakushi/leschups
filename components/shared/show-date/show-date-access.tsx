import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ShowDateAccess({
  locationUrl,
}: {
  locationUrl: string
}) {
  return (
    <Button variant="secondary" className="flex-1 md:w-full">
      <Link
        href={locationUrl}
        target="_blank"
        className="flex justify-center items-center"
      >
        <span>Accès</span>
        <Image
          src="/images/icons/plan-icon.png"
          alt="Plan icon"
          width={25}
          height={25}
        />
      </Link>
    </Button>
  )
}
