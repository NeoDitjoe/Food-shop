import Cart from "@/components/cart/cart"
import { Fragment, useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import Error from "@/components/Error/Error";
import Head from "next/head";
import { useRouter } from "next/router";
import { deleteSentOrder } from "@/database/Database";
import { v4 as uuidv4 } from 'uuid';

export default function Ccart(){

    const route = useRouter()
    const [ cartList, setCartList ] = useState([])

    const getUserCart = route.query.slug[1]
    const pathname = route.query.slug[0]

    useEffect(() => {
        fetch(`/api/cart/placeOrder?user=${getUserCart}`)
            .then(res => res.json())
            .then(data => setCartList(data && data.cart))
    })

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
    const checkUser = userEmail === getUserCart

    if(cartList.length < 1){
        return <Error errorMessage={'Your cart is empty'} link='/' linkText={'add to cart'}/>
    }
    
    return(

        <Fragment>

            <Head>
                <title>{getUserCart.charAt(0).toUpperCase() + getUserCart.slice(1) +"'s "+ pathname}</title>
            </Head>
            {
                checkUser ? 
                    <Cart 
                        results = {cartList}
                        key={uuidv4()}
                    /> : 
                    <Error errorMessage={'User No Found, click to'} link='/auth' linkText={'Login'}/>
            }
        </Fragment>

    )
}

// this function is soley used to clear cart after sending order , they rest is not used
export async function getServerSideProps({params, query}){

    const { slug } = params
    const path = slug[1]
    const { status } = query

    if(status === 'Sent') {
        await deleteSentOrder('cart', 'pendingOrders', path)
     } 

    return {
        props:{
            path,
        }
    }
}