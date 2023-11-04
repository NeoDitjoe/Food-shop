import style from 'styles/search.module.css'
import { useState, useRef } from 'react'
import { debounce } from 'lodash'
import FullWidthGrid from '../grid'
import Image from 'next/image'
import loadingBall from '../../public/Ball-1.2s-215px.svg'

export default function Search(){

    const inputRef = useRef()
    const [searchResults, setSearchResults] = useState(null)
    const [loading, setLoading] = useState(false) 

    function searchHandler(){
        const input = inputRef.current.value
        if(input.length >= 1){
            setLoading(true);

            fetch(`/api/search/searchInput?input=${input}`)
                .then(res => res.json())
                .then(data => {
                    setSearchResults(data.results || []);
                    setLoading(false); 
                });

            window.scrollTo({
                top: 200,
                behavior: 'smooth',
            });
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

            <div>
                <h1 className={style.h1}>
                    {loading ? <Image src={loadingBall} width={50} height={50} alt='loading...'/> : (searchResults && 'Results for: ' + inputRef.current.value)}
                </h1>
                <FullWidthGrid menu={searchResults} /> 
            </div>
        </div>
    )
}
