import Cart from "@/components/cart/cart"
import { use, useEffect, useState } from "react"
import { getCartList } from "@/database/Database"

export default function Ccart({cart}){

    useEffect(() =>{
        console.log(cart)
    })
    
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

export async function getServerSideProps(){
    
    const cart = await getCartList('cart', 'pendingOrders')

    return {
        props:{
            cart
        }
    }

}