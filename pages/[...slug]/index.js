import Cart from "@/components/cart/cart"
import { Fragment, useEffect, useState } from "react"
import { getCartList } from "@/database/Database"
import { useSession } from "next-auth/react";
import Error from "@/components/Error/Error";
import Head from "next/head";
import LinkButton from "@/components/button/button";

export default function Ccart({cart, path, pathToo}){

    const { data: session} = useSession()
    const [ userEmail, setUserEmail ] = useState(null)

    useEffect(() => {
        setUserEmail(session && session.user.email[1])
    }, [session])

    const user = userEmail === path
    
    return(

        <Fragment>

            <Head>
                <title>{path +"'s "+ pathToo.charAt(0).toUpperCase() + pathToo.slice(1)}</title>
            </Head>
            {
                user ? <Cart 
                    results = {cart}
                /> : <Error errorMessage={'User No Found, click to'} link='/auth' linkText={'Login'}/>
            }
        </Fragment>

    )
}


export async function getServerSideProps({params}){

    const { slug } = params
    const path = slug[1]
    const pathToo = slug[0]
    
    const cart = await getCartList('cart', 'pendingOrders', path)

    return {
        props:{
            cart,
            path,
            pathToo
        }
    }

}