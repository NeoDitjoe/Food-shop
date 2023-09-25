import Link from "next/link";
import style from 'styles/button.module.css'

export default function Button({link, name}){
    return(
        <Link href={link} className={style.link}>{name}</Link>
    )
}