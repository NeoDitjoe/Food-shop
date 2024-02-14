import Menu from "@/components/dashboard/products/singleProduct/singleProduct"
import getSingleProduct from "@/database/dashboard.jsx/getSingleProduct"


export default function singleProduct(props) {

  const { data } = props

  console.log(data[0])

  return (
    <div>
      <Menu 
        product = {data && data[0]}
      />
    </div>
  )
}

export async function getServerSideProps({params}) {

  const { slug } = params

  const data = await getSingleProduct(slug)

  return {
    props: {
      data
    }
  }
}