import { ShowCart } from "@/pages/cart"
import style from 'styles/cart.module.css'
import imgV from 'public/burger.jpeg'
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
        <div >
            {
                results && results.map((item) => {
                    totalPrice.push(+item.price)
                    return (
                        <div key={item.item + item.price} className={style.cart}>
                            <Image alt='image' src={item.img} height={200} width={200} className={style.img}/>
                            <div>
                                <h2>{item.item}</h2>
                                <h4>{item.price}</h4>
                            </div>
                        </div>
                    )
                })
            }
            <h3 className={style.totalPrice}>Total Cost: R {results && totalPrice.reduce((a, b) => a + b)}</h3>
        </div>
    )
}