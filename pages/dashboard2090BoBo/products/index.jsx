import Products from "@/components/dashboard/products/products"
import getproducts from "@/database/dashboard.jsx/getProducts"
import { useEffect } from "react"

export default function products(props){

  const { products } = props

  useEffect(() => {
    console.log(products)
  })

  return(
    <Products 
      products = {products}

    />
  )
}

export async function getServerSideProps(){

  const products = await getproducts()

  return{
    props:{
      products
    }
  }
}