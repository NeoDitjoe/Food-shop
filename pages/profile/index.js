import { useSession } from "next-auth/react"

export default function UserProfile(){

    const { data: session, status} = useSession()

    return(
        <h1>{session && session.user.email[1]}</h1>
    )
}