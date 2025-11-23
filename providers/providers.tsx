import { ReactNode } from "react"
import UserContextProvider from "./user-store"
import MusicPlayerContextProvider from "./music.service"
import SongsContextProvider from "./songs-store"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <UserContextProvider>
      <MusicPlayerContextProvider>
        <SongsContextProvider>{children}</SongsContextProvider>
      </MusicPlayerContextProvider>
    </UserContextProvider>
  )
}
