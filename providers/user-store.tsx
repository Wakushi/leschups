"use client"
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { User } from "@/types/user.type"

interface UserContextProviderProps {
  children: ReactNode
}

interface UserContextProps {
  user: User | null
  loadingUser: boolean
  setUser: (user: User) => void
  login: (email: string, password: string) => Promise<void>
  logOut: () => Promise<void>
  loginWithToken: () => Promise<void>
}

const UserContext = createContext<UserContextProps>({
  user: null,
  loadingUser: false,
  setUser: (user: User) => {},
  login: (email: string, password: string) => Promise.resolve(),
  logOut: () => Promise.resolve(),
  loginWithToken: () => Promise.resolve(),
})

export default function UserContextProvider(props: UserContextProviderProps) {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState<boolean>(false)

  useEffect(() => {
    loginWithToken()
  }, [])

  async function login(email: string, password: string) {
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })

    if (!response.ok) {
      const { message } = await response.json()

      toast.error("Erreur de connexion." + message)
      return
    }

    const data = await response.json()
    const user = data.user as User

    setUser(user)

    switch (user.role) {
      case "user":
        router.push("/member/songs")
        break
      case "admin":
        router.push("/admin/user-bookings")
        break
      default:
        router.push("/")
        break
    }
  }

  async function loginWithToken() {
    setLoadingUser(true)

    const response = await fetch(`/api/auth/signin-with-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    if (!response.ok) {
      setLoadingUser(false)
      return
    }

    const user: User = await response.json()

    setUser(user)
    setLoadingUser(false)
  }

  async function logOut(): Promise<void> {
    try {
      const response = await fetch(`/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to log out")
      }

      setUser(null)
      router.push("/")
    } catch (error) {
      console.error(error)
    }
  }

  const context: UserContextProps = {
    user,
    login,
    loadingUser,
    setUser,
    logOut,
    loginWithToken,
  }

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
