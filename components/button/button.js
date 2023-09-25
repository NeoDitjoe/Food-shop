import Link from "next/link";
import { Fragment } from "react";
import style from 'styles/button.module.css'

export default function LinkButton({link, name, text}){
    return(

        <Fragment>
            <Link href={link} className={style.link}>{name}{text}</Link>
        </Fragment>
    )
}

export function Button({click, name}){
    return (
            <button onClick={click} className={style.button}>{name}</button>

    )
}