import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@/components/button/button';
import { useRef } from 'react';
import StateContext from '@/usecontext/stateContext';

export default function UpdateDataForm() {

    const selectedChoice = useRef()
    const { options } = StateContext()

  return (
    <form onSubmit={(e) => {
        e.preventDefault()

        console.log(selectedChoice.current.value)
        console.log(options)
    }}>
    <label>Choose a ... :</label>

    <select ref={selectedChoice}>
        {
            top100Films.map((data) => {
                return <option key={data.year}>{data.label}</option>
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