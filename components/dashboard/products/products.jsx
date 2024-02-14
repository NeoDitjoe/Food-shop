import Image from "next/image"
import style from './products.module.css'
import { BsFillTrashFill } from "react-icons/bs";
import Link from "next/link";
import AddNewProduct from "../addNew/addNewPoductForm";

export default function Products(props) {

  const { products } = props

  return (
    <div>

      <AddNewProduct />
      {
        products && products.map((product, index) => {

          return (
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

              <div>
                <BsFillTrashFill color="red" />
              </div>

            </Link>
          )
        })
      }
    </div>
  )
}
