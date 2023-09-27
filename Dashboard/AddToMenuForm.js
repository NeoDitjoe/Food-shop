import { Button } from "@/components/button/button";
import { useRef } from "react";
import style from 'styles/AddToMenuForm.module.css'

async function addMenu(menu){
    const response = await fetch('/api/menu', {
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

        try{
            await addMenu({
                image: imageValue,
                product: inputValue,
                menu: [
                    {price: itemPriceVaue, list: menuItemValue}
                ]
     
            })
        }catch(error){
            console.log('failed to add menu')
        }
    }

    return (
        <form onSubmit={addMenuHandle} className={style.form}>
            <div className={style.formDiv}>
                <label>Menu: </label>
                <input type="text" required ref={menuRef} />

                <label>Menu Item: </label>
                <input type="text" required ref={menuItemRef} />
                
                <label>Item Price: </label>
                <input type="text" required ref={itemPrice} />

                <div className={style.imageDiv}>
                    <label>Image Link: </label>
                    <input type="text" ref={imageRef} />

                    <label>Image File: </label> 
                    <input type="file"  /> 
                </div>
            </div> 
                <Button name='submit' />
        </form>
    )
}