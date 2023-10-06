import Cart from "@/components/cart/cart"
import { use, useEffect, useState } from "react"
import imgV from 'public/burger.jpeg'
import imgN from 'public/next.svg'
import { getCartList } from "@/database/Database"
import { useSession } from "next-auth/react"

const dummyData = [
    {price :'20.99', item: 'Chips', img: imgV},
    {price :'25.00', item: 'Coke 2L', img: imgN},
    {price :'21.00', item: 'Bread', img: imgV },

]

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