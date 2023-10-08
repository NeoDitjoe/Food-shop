import { Button } from "./button/button"
import style from 'styles/overlay.module.css'
import { useSession } from "next-auth/react";

/**
 * Appears when customers clicks on a product 
 * @returns {Component}
 */
export default function Overlay({click, orderNow, addtoCart, product, item, price, img}){

    //Extract user details
    const { data: session, status } = useSession()

    async function toCart(){
        if(!session){
            alert('login')
        }

        if(session){
            //tracks process 
            console.log('pending')

            /**
             * Add data that is defined in the @components folder then in the / @grid file
             */
            await fetch('/api/cart/cart', {
                method: 'POST',
                body: JSON.stringify({ product: product, item: item, price: price, img: img, user: session.user.email[1] }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
    
            //tracks process
            console.log('success')
        }
    }

    return(
        <div className={style.overlay}>
            <div>
                <dialog>{img}</dialog>
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