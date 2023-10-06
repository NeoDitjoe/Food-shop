import { getMenuList } from "@/database/Database"
import { useEffect } from "react"

export default function Orders({placedOrders}){

    useEffect(() => {
        console.log(placedOrders)
    })



    return (
        <div>
            {
                placedOrders.map((order) => {
                    return (
                        <div key={order.totalPrice}>

                            <p>{order.item}</p>
                            <p>{order.totalPrice}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export async function getServerSideProps(){

    const placedOrders = await getMenuList('cart', 'placedOrders')

    return{
        props: {
            placedOrders
        }
    }
}