import { createContext, useContext, useState } from "react";


const Context = createContext(null)

export default function StateContext(){
    return useContext(Context)
}

export function ContextProvider({children}){

    const [ collapse , setCollapse ] = useState(false)
    const [ options , setOptions ] = useState([])
    const [ text, setText ] = useState(null)
    const [ background, setBackground ] = useState(null)

    const notification = {
        setText,
        text,
        setBackground,
        background

    }

    return (
        <Context.Provider value={{ notification, collapse, setCollapse, options, setOptions}}>
            {children}
        </Context.Provider>
    )
}