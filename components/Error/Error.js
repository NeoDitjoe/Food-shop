import Link from 'next/link'
import style from 'styles/error.module.css'

export default function Error({errorMessage, link, linkText}){
    return <h1 className={style.error}>{errorMessage} <Link href={link}>{linkText}</Link></h1>
}