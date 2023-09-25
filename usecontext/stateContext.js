import { createContext, useContext, useState } from "react";


const Context = createContext(null)

export default function StateContext(){
    return useContext(Context)
}

export function ContextProvider({children}){

    const [ collapse , setCollapse ] = useState(false)

    return (
        <Context.Provider value={{collapse, setCollapse}}>
            {children}
        </Context.Provider>
    )
}