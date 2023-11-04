import style from 'styles/search.module.css'
import { useRef } from 'react'
import { debounce } from 'lodash'

export default function Search(){

    const inputRef = useRef()

    function searchHandler(){
        const input = inputRef.current.value
        if(input.length >= 1){
            console.log(input)
        }
    }

    const debounceSearchHandler = debounce(searchHandler, 1500)

    return (
        <div>
            <form className={style.form}>
                <div className={style.formDiv}>
                    <label htmlFor='search'></label>
                    <input
                        type='text'
                        id='search'
                        required
                        placeholder='Search'
                        ref={inputRef}
                        onChange={debounceSearchHandler}
                    />
                </div>
            </form>
        </div>
    )
}