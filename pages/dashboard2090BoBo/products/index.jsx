import Products from "@/components/dashboard/products/products"
import getproducts from "@/database/dashboard.jsx/getProducts"
import StateContext from "@/usecontext/stateContext"
import Link from "next/link"
import { Fragment, useEffect } from "react"

export default function products(props) {

  const { products } = props

  const { userOnly } = StateContext()

  return (
    <Fragment>
      {
        userOnly
          ? <Products
            products={products}

          />
          : <div>
            {'Click '}
            <Link href={'/'}>here</Link>
          </div>
      }
    </Fragment>
  )
}

export async function getServerSideProps() {

  const products = await getproducts()

  return {
    props: {
      products
    }
  }
}