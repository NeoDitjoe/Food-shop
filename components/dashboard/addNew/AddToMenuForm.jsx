import { Button } from "@/components/button/button";
import { useRef, useState } from "react";
import style from 'styles/AddToMenuForm.module.css'
import StateContext from "@/usecontext/stateContext";
import { useRouter } from "next/router";
import { notificationTimer } from "@/components/Notification/Notification";

async function addMenu(menu, collection){
    const response = await fetch(`/api/dashboard/menu?collection=${collection}`, {
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

export default function AddToMenuForm({collection}){

    const { notification } = StateContext()
    const router = useRouter()

    const menuRef = useRef()
    const menuItemRef = useRef()
    const itemPrice = useRef()
    const [image, setImage] = useState('')

    async function addMenuHandle(e){
        e.preventDefault()
        const inputValue = menuRef.current.value
        const menuItemValue = menuItemRef.current.value
        const itemPriceVaue = itemPrice.current.value

        notification.setText('Loading...')
        notification.setSeverity('info')

        try{
            await addMenu({
                image: image,
                product: inputValue.toLowerCase(),
                menu: [
                    {price: itemPriceVaue, item: menuItemValue.toLowerCase()}
                ]
            }, collection)
            
            notification.setText('Item is added to menu')
            notification.setSeverity('success')
            notificationTimer(notification)
            router.reload()

        }catch(error){

            notification.setText(error.message)
            notification.setSeverity('error')
            notificationTimer(notification)
        }
    }

    function convertToBase64(e){

        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result)
        }
        reader.onerror = error => {
            console.log('Error: ', error)
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
                   
                    <label>Image File: </label> 
                    <input accept="image/*" type="file" onChange={convertToBase64} /> 
                </div>
            </div> 
                <Button name='submit' />
        </form>
    )
}