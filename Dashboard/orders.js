export default function Orders({placedOrders}){

    return(
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