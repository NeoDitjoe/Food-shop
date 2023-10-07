import Error from "@/components/Error/Error"
import { getMenuList } from "@/database/Database"
import { useEffect } from "react"
import style from 'styles/dashboard.module.css'

export default function Orders({placedOrders}){

    useEffect(() => {
        console.log(placedOrders)
    })

    let NoOrders

    if( placedOrders.length === 0 ) {
        return (
            <Error errorMessage={'NO ORDERS PLACED, click to'} link='/' linkText={'Place Order'}/>
            
        )
    }

    return (
        <div>
            {
                placedOrders.map((order) => {
                    return (
                        <div key={order.totalPrice}>
                            <br/>
                            <hr/>
                            <h4>{order.customer}</h4>
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