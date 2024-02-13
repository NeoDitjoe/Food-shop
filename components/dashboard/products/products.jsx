import Image from "next/image"
import style from './products.module.css'
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { BsFillTrashFill } from "react-icons/bs";
import Link from "next/link";

export default function Products(props) {

  const { products } = props

  return (
    <div>
      {
        products && products.map((product) => {

          return (
            <Link
            href={`/dashboard2090BoBo/products/${product.product}`} 
              className={style.main}>
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
                <BsFillTrashFill color="red"/>
              </div>
             
            </Link>
          )
        })
      }
    </div>
  )
}
