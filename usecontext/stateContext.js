import { createContext, useContext, useState } from "react";


const Context = createContext(null)

export default function StateContext(){
    return useContext(Context)
}

export function ContextProvider({children}){

    const [ collapse , setCollapse ] = useState(false)
    const [ options , setOptions ] = useState([])

    return (
        <Context.Provider value={{collapse, setCollapse, options, setOptions}}>
            {children}
        </Context.Provider>
    )
}