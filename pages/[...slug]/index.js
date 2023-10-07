import Cart from "@/components/cart/cart"
import { useEffect, useState } from "react"
import { getCartList } from "@/database/Database"

export default function Ccart({cart, what}){
    
    return(
        <Cart 
            results = {cart}
        />
    )
}

export function ShowCart(){
    const [ results, setResults ] = useState()

    useEffect(() => {
      fetch('/api/cart/cart')
        .then((res) => res.json())
        .then((data) => setResults(data.orders))
    })

    return results
}

export async function getServerSideProps({params}){

    const { slug } = params
    const what = slug[1]
    
    const cart = await getCartList('cart', 'pendingOrders', what)

    return {
        props:{
            cart,
            what
        }
    }

}