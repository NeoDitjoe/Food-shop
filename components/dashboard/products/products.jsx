import Image from "next/image"
import style from './products.module.css'
import { BsFillTrashFill } from "react-icons/bs";
import Link from "next/link";
import AddNewProduct from "../addNew/addNewPoductForm";
import { removeItem } from "@/database/removeFromDatabase";
import StateContext from "@/usecontext/stateContext";

export default function Products(props) {

  const { notification } = StateContext()

  const { products } = props

  async function removeProduct(product) {
    try {

      notification.setText('Removing product...')
      notification.setSeverity('info')

      const response =
        await removeItem(`/api/dashboard/removeProduct?product=${product}`)

      notification.setText('Removed product')
      notification.setSeverity('success')
      window.location.reload()

    } catch (error) {
      console.log(error)
      notification.setText(error.message)
      notification.setSeverity('error')
    }
  }

  return (
    <div>

      <AddNewProduct />
      {
        products && products.map((product, index) => {

          return (
            <div className={style.container}>
              <Link
                href={`/dashboard2090BoBo/products/${product.product}`}
                className={style.main}
                key={index}
              >
                <div>
                  <Image
                    src={product.image}
                    width={400}
                    height={400}
                    alt={product.product}
                    className={style.img}

                  />
                </div>

                <div>
                  <h5>{product.product}</h5>
                </div>


              </Link>

              <BsFillTrashFill
                onClick={() => removeProduct(product.product)}
                color="red"
                className={style.trashBin}
              />
            </div>
          )
        })
      }
    </div>
  )
}
