import { ReactNode } from "react"
import UserContextProvider from "./user-store"
import MusicPlayerContextProvider from "./music.service"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <UserContextProvider>
      <MusicPlayerContextProvider>{children}</MusicPlayerContextProvider>
    </UserContextProvider>
  )
}
