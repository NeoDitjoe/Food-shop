import { Button } from "@/components/button/button";
import { useRef } from "react";
import style from 'styles/AddToMenuForm.module.css'
import StateContext from "@/usecontext/stateContext";
import { useRouter } from "next/router";
import { notificationTimer } from "@/components/Notification/Notification";

async function addMenu(menu){
    const response = await fetch('/api/dashboard/menu', {
        method: 'POST',
        body: JSON.stringify(menu),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
}

export default function AddToMenuForm(){


    const { notification } = StateContext()
    const router = useRouter()

    const menuRef = useRef()
    const menuItemRef = useRef()
    const itemPrice = useRef()
    const imageRef = useRef()

    async function addMenuHandle(e){
        e.preventDefault()
        const inputValue = menuRef.current.value
        const menuItemValue = menuItemRef.current.value
        const itemPriceVaue = itemPrice.current.value
        const imageValue = imageRef.current.value

        notification.setText('Loading...')
        notification.setBackground('loadingNotification')

        try{
            await addMenu({
                image: imageValue,
                product: inputValue.toLowerCase(),
                menu: [
                    {price: itemPriceVaue, item: menuItemValue}
                ]
            })
            
            notification.setText('Item is added to menu')
            notification.setBackground('successNotification')
            notificationTimer(notification)
            router.reload()

        }catch(error){

            notification.setText('Failed to add menu')
            notification.setBackground('errorNotification')
            notificationTimer(notification)
        }
    }

    return (
        <form onSubmit={addMenuHandle} className={style.form}>
            <div className={style.formDiv}>
                <label>Menu: </label>
                <input type="text" required ref={menuRef}/>

                <label>Menu Item: </label>
                <input type="text" required ref={menuItemRef} />
                
                <label>Item Price: </label>
                <input type="text" required ref={itemPrice} />

                <div className={style.imageDiv}>
                    <label>Paste Image Link: </label>
                    <input type="text" ref={imageRef} />
                    <br/>
                    <label>Image File: </label> 
                    <input type="file"  /> 
                </div>
            </div> 
                <Button name='submit' />
        </form>
    )
}