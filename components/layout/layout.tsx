import Providers from "@/providers/providers"
import Header from "./header"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Header />
      {children}
    </Providers>
  )
}
