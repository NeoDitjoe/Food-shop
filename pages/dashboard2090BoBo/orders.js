import Error from "@/components/Error/Error"
import { getMenuList } from "@/database/Database"
import { BsFillTrashFill } from "react-icons/bs";
import style from 'styles/dashboard.module.css'

export default function Orders({placedOrders}){

    let NoOrders

    if( placedOrders.length === 0 ) {
        return (
            <Error errorMessage={'NO ORDERS PLACED'} />
            
        )
    }

    return (
        <div>
            {
                placedOrders.map((order) => {
                    return (
                        <div key={order.totalPrice+order.customer+order.item+new Date()} className={style.orders}>
                            <div className={style.order}>
                                <h4>{order.customer}</h4>
                                <p>{order.item}</p>
                                <p className={style.price}>R {order.totalPrice.toFixed(2)}</p>
                            </div>

                            <div className={style.bin} onClick={() => {
                                    try{
                                        removeItem({ username: order.customer , item: order.item})
                                        console.log('removed order')

                                    }catch(error){
                                        console.log('attempt failed')
                                    }
                                    }}>
                                    <BsFillTrashFill color='red' size={25} />
                                    
                            </div>
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

async function removeItem(item){
    await fetch('/api/dashboard/removePlacedOrders', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json',
        }
    })
}