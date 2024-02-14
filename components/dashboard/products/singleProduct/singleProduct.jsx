import Image from "next/image"
import style from './singleProduct.module.css'
import Backdrop from '@mui/material/Backdrop';
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import Form from "./editForm/form";
import { useParams } from "next/navigation";
import addToDatabase from "@/database/addToDatabase";
import { Button } from "@/components/button/button";

export default function Menu(props) {

  const { product } = props
  const [editForm, setEditform] = useState(false)
  const [addNewForm, setAddNewForm] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const paramName = useParams()

  async function editFormHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const itemValue = formData.get('item');
    const itemPrice = formData.get('price');

    try {
      const response = await addToDatabase(
        '/api/dashboard/editMenuItems',
        {
          product: paramName.slug,
          item: currentItem,
          updateItem: itemValue.toLocaleLowerCase(),
          updatePrice: itemPrice
        })

      if (response.message === 'success') {
        window.location.reload();
      }

    } catch (error) {
      alert('error')
    }

  }

  async function addNewItem(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const itemValue = formData.get('item');
    const itemPrice = formData.get('price');

    try {
      const response = await addToDatabase(
        '/api/dashboard/updateMenu',
        {
          product: paramName.slug,
          item: itemValue.toLocaleLowerCase(),
          price: itemPrice
        }
      )

      if (response.message === 'Successfully stored!') {
        window.location.reload();
      }
    } catch (error) {
      alert(error.message || 'check your internet connection!')
    }
  }

  return (

    <div className={style.main}>

      <div>
        <h1>{product.product}</h1>
      </div>

      <div>
        <Image
          src={product.image}
          alt={product.product}
          width={400}
          height={400}
          className={style.img}
        />
      </div>

      <div className={style.addNew}>
        <Button
          name='Add new'
          click={() => setAddNewForm(true)}
        />
      </div>

      <div>
        {
          product.menu.map((item, index) => (
            <div
              onClick={() => {
                setEditform(true)
                setCurrentItem(item.item)
              }}
              className={style.menu}
              key={index}
            >
              <div>
                {index + 1}.
              </div>

              <div className={style.items}>
                <p>{item.item}</p>
                <h5>R {Number(item.price).toFixed(2)}</h5>
              </div>
            </div>
          ))
        }
      </div>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={addNewForm}
      >
        <div className={style.Backdrop}>
          <p
            className={style.closeEditForm}
            onClick={() => setAddNewForm(false)}
          ><IoMdClose color="red" size={30} /></p>

          <Form
            editForm={addNewItem}
          />

        </div>
      </Backdrop>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={editForm}
      >
        <div className={style.Backdrop}>
          <p
            className={style.closeEditForm}
            onClick={() => setEditform(false)}
          ><IoMdClose color="red" size={30} /></p>

          <Form
            editForm={editFormHandler}
          />

        </div>
      </Backdrop>

    </div>
  )
}