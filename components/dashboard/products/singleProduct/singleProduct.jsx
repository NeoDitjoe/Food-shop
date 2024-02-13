import Image from "next/image"
import style from './singleProduct.module.css'

export default function Menu(props) {

  const { product } = props

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

      <div>
        {
          product.menu.map((item, index) => (
            <div className={style.menu}>
              <div>
                {index + 1}. 
              </div>

              <div className={style.items}>
                <p>{item.item}</p>
                <h5>{item.price}</h5>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}