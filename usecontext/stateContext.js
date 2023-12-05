import { createContext, useContext, useState } from "react";


const Context = createContext(null)

export default function StateContext(){
    return useContext(Context)
}

export function ContextProvider({children}){

    const [ collapse , setCollapse ] = useState(false)
    const [ options , setOptions ] = useState([])
    const [ text, setText ] = useState(null)
    const [ severity, setSeverity ] = useState(null)
    const [ overlayCollapse, setOverlayCollapse] = useState(false)

    const notification = {
        setText,
        text,
        setSeverity,
        severity

    }

    return (
        <Context.Provider value={{ overlayCollapse, setOverlayCollapse, notification, collapse, setCollapse, options, setOptions}}>
            {children}
        </Context.Provider>
    )
}