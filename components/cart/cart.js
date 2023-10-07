import style from 'styles/cart.module.css'
import Image from "next/image"
import { useRouter } from 'next/router'

export default function Cart({results}){
    
    let totalPrice = []
    let items = []
    const router = useRouter()
    const customer = router.query.slug[1]

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

    async function orderHandler(e){
        e.preventDefault()

    try {
        const result = await placeOrder( items ,totalPrice.reduce((a, b) => a + b, 0), customer );
        console.log(result);
        } catch (error) {
        console.log(error);
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
                    <h4>Total Cost: R {results && totalPrice.reduce((a, b) => a + b, 0)}</h4>
                    <br />
                    <h4>Place Order</h4>
                </div>
                
            </div> : <h2 className={style.emptyCart}>YOUR CART IS EMPTY</h2>
            }
        </>
    )
}