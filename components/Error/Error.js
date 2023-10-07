import style from 'styles/error.module.css'

export default function Error({errorMessage}){
    return <h1 className={style.error}>Error {errorMessage}</h1>
}