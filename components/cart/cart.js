import { ShowCart } from "@/pages/cart"
import style from 'styles/cart.module.css'
import imgV from 'public/vercel.svg'
import imgN from 'public/next.svg'
import Image from "next/image"


export default function Cart(){
    
    const results = ShowCart()
    let totalPrice = []

    const dummyData = [
        {price :'20.99', item: 'Chips', img: imgV},
        {price :'25.00', item: 'Coke 2L', img: imgN},
        {price :'21.00', item: 'Bread', img: imgV },

    ]
    
    return (
        <div className={style.cart}>
            {
                dummyData && dummyData.map((item) => {
                    totalPrice.push(+item.price)
                    return (
                        <div key={item.item + item.price}>
                            <Image alt='image' src={item.img} heigh={100} width={100}/>
                            <p>{item.item}</p>
                            <p>{item.price}</p>
                        </div>
                    )
                })
            }
            <h3>{totalPrice.reduce((a, b) => a + b)}</h3>
        </div>
    )
}