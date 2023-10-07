import Cart from "@/components/cart/cart"
import { useEffect, useState } from "react"
import { getCartList } from "@/database/Database"
import { useSession } from "next-auth/react";

export default function Ccart({cart, path}){

    const { data: session} = useSession()
    const [ userEmail, setUserEmail ] = useState(null)

    let useremail

    useEffect(() => {

        console.log([session && session.user.email[1], path])
        setUserEmail(session && session.user.email[1])
    }, [session, path])
    
    if(!userEmail === path){
        return <p>Error</p>
    }

    const user = userEmail === path
    
    return(

        <>
            {
                user ? <Cart 
                    results = {cart}
                /> : <p>Error: User No Found</p>
            }
        </>

    )
}


export async function getServerSideProps({params}){

    const { slug } = params
    const path = slug[1]
    
    const cart = await getCartList('cart', 'pendingOrders', path)

    return {
        props:{
            cart,
            path
        }
    }

}