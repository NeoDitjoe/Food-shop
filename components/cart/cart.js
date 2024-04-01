import style from 'styles/cart.module.css'
import Image from "next/image"
import { useRouter } from 'next/router'
import { notificationTimer } from '../Notification/Notification'
import { BsFillTrashFill } from "react-icons/bs";
import { useSession } from 'next-auth/react'
import loading from '../../public/Ball-1.2s-215px.svg'
import { v4 as uuidv4 } from 'uuid';
import StateContext from '@/usecontext/stateContext';

export default function Cart({results}){

    const { notification } = StateContext()
    const { data: session } = useSession()

    const username = session?.user?.email.username
    
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

        notification.setText(`sending Order`)
        notification.setSeverity('info')

    try {
        const results = await placeOrder( items ,totalPrice.reduce((a, b) => a + b, 0), customer );

            /**
             * {@link route } p
             */
            // const route = 
            if(results.message === 'success'){
                notification.setText('Order has been sent successfully sent')
                notification.setSeverity('success')
                router.replace(`/cart/${customer}?status=Sent`)

                setTimeout(() => {
                    router.push('/')
                    
                }, [800]);

                notificationTimer(notification)

            }
           
        } catch (error) {
            notification.setText("failed to send order: Please reload page and try again and make sure your cart has Items")
            notification.setSeverity('error')
            notificationTimer(notification)
            alert('error')
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
                            <div key={uuidv4()} className={style.cart}>
                                <Image alt='image' src={item.img} height={200} width={200} className={style.img}/>
                                <div>
                                    <h3>{item.item} {item.product}</h3>
                                    <h4>R {item.price}</h4>
                                </div>
                               <div className={style.bin} onClick={() => {
                                removeItem({ username: username , item: item.item})
                                    }}>
                                    <BsFillTrashFill color='red' size={25} />
                               </div>
                            </div>
                        )
                    })
                }
                {totalPrice > 0 && <button className={style.totalPrice} onClick={orderHandler} >
                    <h4>Total Cost: R {results && totalPrice.reduce((a, b) => a + b, 0).toFixed(2)}</h4>
                    <br />
                    <h4>Place Order</h4>
                </button>}
                
            </div> : <Image src={loading} width={200} heigh={100} alt={'...loading'}  className={style.emptyCart}/>
            }
        </>
    )
}

async function removeItem(item){
    await fetch('/api/cart/removePendingOrders', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json',
        }
    })
}