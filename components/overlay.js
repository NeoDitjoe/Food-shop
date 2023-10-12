import { Button } from "./button/button"
import style from 'styles/overlay.module.css'
import { useSession } from "next-auth/react";
import StateContext from "@/usecontext/stateContext";
import {notificationTimer} from "./Notification/Notification";

/**
 * Appears when customers clicks on a product 
 * @returns {Component}
 */


export default function Overlay({click, orderNow, addtoCart, product, item, price, img}){

    //Extract user details
    const { data: session, status } = useSession()
    
    const {notification, setOverlayCollapse } = StateContext()

    async function toCart(){
        if(!session){
            notification.setText(`Login to place order`)
            notification.setBackground('errorNotification')
            notificationTimer(notification)
        }

        if(session){
            //tracks process 
            notification.setText('Adding to cart')
            notification.setBackground('loadingNotification')

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
            notification.setText('Added to cart')
            notification.setBackground('successNotification')
            notificationTimer(notification)
        }

        setOverlayCollapse(false)
    }

    return(
        <div className={style.overlay}>
            <div>
                <dialog>{img}</dialog>
                <h1>{product}</h1>
                <p>{item}</p>
                <p>R {price}</p>
                <br/>
                <p>Have a Request ?</p>
                <textarea type="text" />

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