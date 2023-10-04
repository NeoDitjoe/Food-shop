import { Button } from '@/components/button/button';
import { useEffect, useRef, useState } from 'react';
import style from 'styles/inputBox.module.css'

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

  const [ menu , setmenu ] = useState(null)

  useEffect(() => {

    fetch('/api/menu')
      .then(res => res.json())
      .then(data =>  setmenu(data.menu))
      
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

        <div>
          <label>Modify</label>
          <select ref={selectProduct} style={{ height:'9vh', width: '200px', borderRadius: '4px', background: 'transparent' }}>
            {
              menu && menu.map((data) => {
                  return <option key={data.product}>{data.product}</option>
              })
            }   
          </select>
        </div>

        <div>
          <label>Item:</label>
          <input type='text' ref={itemRef} required style={{ height:'9vh', width: '200px', borderRadius: '4px', background: 'transparent' }}/>
        </div>

        <div>
          <label>Price:</label>
          <input type='text' ref={priceRef} required style={{ height:'9vh', width: '200px', borderRadius: '4px', background: 'transparent' }}/>
        </div>
            
        <Button name='Submit'/>

      </form>
  );
}