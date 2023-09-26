import { Button } from "@/components/button/button";
import { useRef } from "react";

async function addMenu(menu){
    const response = await fetch('/api/menu', {
        method: 'POST',
        body: JSON.stringify({menu}),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
}

export default function AddToMenu(){

    const inputRef = useRef()

    // function inputs(){
    //     const inputValue = inputRef.current.value

    //     return inputValue
    // }

    async function addMenuHandle(e){
        e.preventdefault()
        const inputValue = inputRef.current.value

        try{
            await addMenu(inputValue)
        }catch(error){
            console.log('failed to add menu')
        }
    }

    return (
        <form onSubmit={addMenuHandle}>
            <input type="text" 
                required 
                ref={inputRef}
            />
            <Button name='submit' />
        </form>
    )
}