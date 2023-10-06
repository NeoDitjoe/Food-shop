import { ShowCart } from "@/pages/cart"
import style from 'styles/cart.module.css'
import imgV from 'public/burger.jpeg'
import imgN from 'public/next.svg'
import Image from "next/image"

const dummyData = [
    {price :'20.99', item: 'Chips', img: imgV},
    {price :'25.00', item: 'Coke 2L', img: imgN},
    {price :'21.00', item: 'Bread', img: imgV },

]

export default function Cart(){
    
    const results = ShowCart()
    let totalPrice = []

    
    return (
        <>
            { results ? 
                <div >
                {
                    results && results.map((item) => {
                        totalPrice.push(+item.price)
                        return (
                            <div key={item.item + item.price} className={style.cart}>
                                <Image alt='image' src={item.img} height={200} width={200} className={style.img}/>
                                <div>
                                    <h3>{item.item}</h3>
                                    <h4>R {item.price}</h4>
                                </div>
                            </div>
                        )
                    })
                }
                <div className={style.totalPrice}>
                    <h4>Total Cost: R {results && totalPrice.reduce((a, b) => a + b, 0)}</h4>
                    <br />
                    <h4>Place Order</h4>
                </div>
                
            </div> : <h2 className={style.emptyCart}>YOUR CART IS EMPTY</h2>
            }
        </>
    )
}