import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@/components/button/button';
import { useEffect, useRef, useState } from 'react';
import StateContext from '@/usecontext/stateContext';

export default function UpdateMenuForm() {

    const selectedChoice = useRef()
    const { options } = StateContext()
    const [ m , setm ] = useState(null)

    useEffect(() => {

      fetch('/api/menu')
        .then(res => res.json())
        .then(data =>  setm(data))

    })

    function l(e){
      e.preventDefault()

      console.log(selectedChoice.current.value)
      console.log(m && m)
    }

  return (
    <form onSubmit={l}>

    <label>Choose a ... : </label>
    <select ref={selectedChoice}>
        {
            options.map((data) => {
                return <option key={data.year}>{data.product}</option>
            })
        }   
    </select>

        <Button name='Submit'/>

    </form>
  );
}

const top100Films = [
    
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 }

];