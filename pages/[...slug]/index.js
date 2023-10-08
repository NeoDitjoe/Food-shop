import Cart from "@/components/cart/cart"
import { Fragment, useEffect, useState } from "react"
import { getCartList } from "@/database/Database"
import { useSession } from "next-auth/react";
import Error from "@/components/Error/Error";
import Head from "next/head";
import { deleteSentOrder } from "@/database/Database";

export default function Ccart({cart, path, pathToo}){


    /**
     * {@link session} idetifies the current user while {@link setUserEmail} stores the extracted name from the {@link session}
     * 
     */
    const { data: session} = useSession()
    const [ userEmail, setUserEmail ] = useState(null)

    useEffect(() => {
        setUserEmail(session && session.user.email[1])
    }, [session])
    
    //compares the logged in user from the session with the name from the path
    //so the correct users data can always be retrieved
    const user = userEmail === path
    
    return(

        <Fragment>

            <Head>
                <title>{path +"'s "+ pathToo.charAt(0).toUpperCase() + pathToo.slice(1)}</title>
            </Head>
            {
                user ? 
                    <Cart 
                        results = {cart}
                        deleteOrder={'what'}
                    /> : 
                    <Error errorMessage={'User No Found, click to'} link='/auth' linkText={'Login'}/>
            }
        </Fragment>

    )
}


export async function getServerSideProps({params}){

    const { slug } = params
    const path = slug[1]
    const pathToo = slug[0]
    
    const cart = await getCartList('cart', 'pendingOrders', path)

    /**
     * This is done to handle default deleting of cart  
     * so when the order button is clicked,
     * A 3rd path is adde on the route
     * when we have the 3rd path and it matches the message{@link  we have received your order} then the customers cart will be cleaned
     */
    if(slug[2] === 'we have received your order') {
       await deleteSentOrder('cart', 'pendingOrders', path)
    }

    return {
        props:{
            cart,
            path,
            pathToo
        }
    }

}