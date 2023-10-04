import LinkButton, { Button } from "@/components/button/button"
import { useSession, signOut } from "next-auth/react"
import { Fragment } from "react"

export default function UserProfile(){

    const { data: session, status} = useSession()

    return(
        <Fragment>
            <h1>{session && session.user.email[1]}</h1>

            {session ? <Button click={() => signOut()} name='LOGOUT'/> : <p>redirect to <LinkButton link='/auth' name='Login' /> page</p> }
        </Fragment>
    )
}
