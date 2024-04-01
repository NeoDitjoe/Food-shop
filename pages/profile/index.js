import LinkButton, { Button } from "@/components/button/button"
import { useSession, signOut } from "next-auth/react"
import Head from "next/head"
import { Fragment } from "react"

export default function UserProfile(){

    const { data: session, status} = useSession()

    return(
        <Fragment>

            <Head>
                <title>{session?.user?.email.username}</title>
            </Head>
            
            <h1>{session?.user?.email.username}</h1>

            {session ? <Button click={() => signOut()} name='LOGOUT'/> : <p>redirect to <LinkButton link='/auth' name='Login' /> page</p> }
        </Fragment>
    )
}
