import style from 'styles/search.module.css'
import { Button } from '../button/button'

export default function Search(){
    return (
        <div>
            <form className={style.form}>
                <div className={style.formDiv}>
                    <label htmlFor='search'>Your Password</label>
                    <input
                        type='text'
                        id='search'
                        required
                    />
                </div>

                <div className={style.actions}>
                    <Button name='Find' />
                </div>
            </form>
        </div>
    )
}