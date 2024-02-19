import Menu from "@/components/dashboard/products/singleProduct/singleProduct"
import getSingleProduct from "@/database/dashboard.jsx/getSingleProduct"
import StateContext from "@/usecontext/stateContext"
import Link from "next/link"


export default function singleProduct(props) {

  const { data } = props
  const { userOnly } = StateContext()

  return (
    <div>
      {
        userOnly
          ? <Menu
            product={data && data[0]}
          />
          : <div>
            {'Click '}
            <Link href={'/'}>here</Link>
          </div>
      }
    </div>
  )
}

export async function getServerSideProps({ params }) {

  const { slug } = params

  const data = await getSingleProduct(slug)

  return {
    props: {
      data
    }
  }
}