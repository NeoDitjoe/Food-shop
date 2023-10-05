import { Button } from "./button/button"
import style from 'styles/overlay.module.css'
import { useSession } from "next-auth/react";


export default function Overlay({click, orderNow, addtoCart, product, item, price}){

    const { data: session, status } = useSession()

    async function toCart(){

        console.log('topp')

        await fetch('/api/cart/cart', {
            method: 'POST',
            body: JSON.stringify({ item: item, price: price, user: session.user.email[0] }),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        console.log('bottom')
    }

    return(
        <div className={style.overlay}>
            <div>
                <h1>{product}</h1>
                <p>{item}</p>
                <p>R {price}</p>

                <div className={style.buttons}>

                    <div className={style.button} >
                        <Button 
                            name={'ORDER NOW'} 
                            click = {orderNow}
                        />
                    </div>

                    <div className={style.button} >
                        <Button 
                            name={'ADD TO CART'} 
                            click = {toCart}
                        />
                    </div>

                    <div className={style.button} >
                        <Button 
                            name={'CLOSE'} 
                            click = {click}
                        />
                    </div>

                </div>
            </div>
    </div>
    )
}