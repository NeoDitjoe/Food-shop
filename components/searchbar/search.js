import style from 'styles/search.module.css'
import { useState, useRef } from 'react'
import { debounce } from 'lodash'
import FullWidthGrid from '../grid'

export default function Search(){

    const inputRef = useRef()
    const [ searchResults, setsearchResults ] = useState(null)

    function searchHandler(){
        const input = inputRef.current.value
        if(input.length >= 1){

        fetch(`/api/search/searchInput?input=${input}`)
            .then(res => res.json())
            .then(data => setsearchResults(data.results || []))
        }
    }

    const debounceSearchHandler = debounce(searchHandler, 1000)

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

            <FullWidthGrid menu={searchResults} /> 
        </div>
    )
}