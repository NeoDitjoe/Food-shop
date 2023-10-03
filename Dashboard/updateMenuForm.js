import { Button } from '@/components/button/button';
import { useEffect, useRef, useState } from 'react';

async function createUser(item) {
  const response = await fetch('/api/addItem', {
    method: 'POST',
    body: JSON.stringify(item),
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

  const selectProduct = useRef()
  const itemRef = useRef()
  const priceRef = useRef()

  const [ m , setm ] = useState(null)

  useEffect(() => {

    fetch('/api/menu')
      .then(res => res.json())
      .then(data =>  setm(data.menu))
      
  })

  async function workman(event){
    event.preventDefault()

    const productInput = selectProduct.current.value
    const itemInput = itemRef.current.value
    const priceInput = priceRef.current.value

    try {
      const result = await createUser({product: productInput, item: itemInput, price: priceInput});
      console.log(result);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <form onSubmit={workman}>

      <select ref={selectProduct}>
          {
              m && m.map((data) => {
                  return <option key={data.product}>{data.product}</option>
              })
          }   
      </select>
      
      <label>Item:</label>
      <input type='text' ref={itemRef} required/>
      
      <label>Price:</label>
      <input type='text' ref={priceRef} required/>
          
      <Button name='Submit'/>
      
    </form>
  );
}