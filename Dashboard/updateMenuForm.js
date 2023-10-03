import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@/components/button/button';
import { useEffect, useRef, useState } from 'react';
import StateContext from '@/usecontext/stateContext';

async function createUser() {
  const response = await fetch('/api/addItem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

export default function UpdateMenuForm() {

    const selectedChoice = useRef()
    const { options } = StateContext()
    const [ m , setm ] = useState(null)

    useEffect(() => {

      fetch('/api/menu')
        .then(res => res.json())
        .then(data =>  setm(data))

    })

    function l(){


      console.log(selectedChoice.current.value)
      console.log(m && m)
    }

    async function workman(event){
      event.preventDefault()
      l()
      try {
          const result = await createUser();
          console.log(result);
        } catch (error) {
          console.log(error);
        }
  
  }

  return (
    <form onSubmit={workman}>

    <label>Select a product </label>
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