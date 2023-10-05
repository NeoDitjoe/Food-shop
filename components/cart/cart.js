import { ShowCart } from "@/pages/cart"
import { Fragment, useEffect, useState } from "react"


export default function Cart(){
    
    const results = ShowCart()
    let totalPrice = []
    // useEffect(() => console.log())


    const dummyData = [
        {price :'20.99', item: 'Chips' },
        {price :'25.00', item: 'Coke 2L' },
        {price :'21.00', item: 'Bread' },

    ]

    return (
        <Fragment>
            {
                dummyData && dummyData.map((item) => {
                    totalPrice.push(+item.price)
                    return (
                        <div key={item.item + item.price}>
                            <p>{item.item}</p>
                            <p>{item.price}</p>
                        </div>
                    )
                })
            }
            <h3>{totalPrice.reduce((a, b) => a + b)}</h3>
        </Fragment>
    )
}