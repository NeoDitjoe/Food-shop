import style from 'styles/cart.module.css'
import Image from "next/image"
import { useRouter } from 'next/router'
import StateContext from '@/usecontext/stateContext'

export default function Cart({results, deleteOrder}){

    const { notification } = StateContext()
    
    /**
     * Stores the order
     * when {@link results}  is being mapped over {@link totalPrice} array then stores the 
     * list of costs in this array which wil later be combined into a total sum
     * 
     * {@link item } Array stores the Items that is in the cart, 
     * until customer is certisfied to place the order
     */
    let totalPrice = []
    let items = []

    /**
     * Extract the user name from the path
     * 
     * This name will then be used to identify who placed the order when order is being collected
     * hence the the database restrict duplicate names in the system
     */
    const router = useRouter()
    const customer = router.query.slug[1]


    /**
     * 
     * @param {string} item - Item the customer orders
     * @param {number} price - The total cost of the customer's order
     * @param {string} customer - Then name of the customer who placed an order
     * @returns 
     * 
     * 
     */
    async function placeOrder(item, price, customer) {
        const response = await fetch('/api/cart/placeOrder', {
          method: 'POST',
          body: JSON.stringify({ item, price, customer}),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      
        const data = await response.json();
      
        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong!');
        }
      
        return data;
    }


    /**
     * 
     * @param {*} e - prevent any default
     * 
     * This function calls the {@link placeOrder} function
     * it defines its parameters and also handles any possible errors using the
     * try catch method
     */    
    async function orderHandler(e){
        e.preventDefault()
        notification.setText('sending Order')
        notification.setBackground('loadingNotification')

    try {
        const result = await placeOrder( items ,totalPrice.reduce((a, b) => a + b, 0), customer );

            /**
             * {@link route } p
             */
            const route = router.replace(`/cart/${customer}/we have received your order`)
            if(route){
                notification.setText('Order has been sent successfully')
                notification.setBackground('successNotification')
                router.push('/')
            }
            router.push('/')
        } catch (error) {
            notification.setText("failed to send order: Please reload page and try again and make sure your cart has Items")
            notification.setBackground('errorNotification')
        }
    }

    return (
        <>
            { results ? 
                <div >
                {
                    results && results.map((item) => {

                        totalPrice.push(+item.price)
                        items.push(item.item + ' - '+ item.product + ' | ')

                        return (
                            <div key={item.item + item.price} className={style.cart}>
                                <Image alt='image' src={item.img} height={200} width={200} className={style.img}/>
                                <div>
                                    <h3>{item.item} {item.product}</h3>
                                    <h4>R {item.price}</h4>
                                </div>
                            </div>
                        )
                    })
                }
                <div className={style.totalPrice} onClick={orderHandler} >
                    <h4>Total Cost: R {results && totalPrice.reduce((a, b) => a + b, 0).toFixed(2)}</h4>
                    <br />
                    <h4>Place Order</h4>
                </div>
                
            </div> : <h2 className={style.emptyCart}>YOUR CART IS EMPTY</h2>
            }
        </>
    )
}