import Cart from "@/components/cart/cart"
import { useEffect, useState } from "react"

export default function cart(){
    
    return(
        <Cart />
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