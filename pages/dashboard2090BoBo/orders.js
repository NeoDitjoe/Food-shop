import Error from "@/components/Error/Error"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import style from 'styles/dashboard.module.css'

export default function Orders() {

	const [orders, setOrders] = useState(null)

	const { data: session } = useSession()
	const [username, setUserName] = useState('')
	const [userEmail, setUserEmail] = useState('')

	useEffect(() => {
		setUserName(session && session.user.email[1])
		setUserEmail(session && session.user.email[0])
	})

	const checkUser = username === 'administratorbobo'
	const checkUserEmail = userEmail === 'martins@gmail.com'

	useEffect(() => {
		fetch('/api/dashboard/orders')
			.then(res => res.json())
			.then(data => setOrders(data && data.orders))

	})

	if (orders && orders.length == 0) {
		return (
			<Error errorMessage={'NO ORDERS PLACED'} link={'.'} linkText={'dashboard'} />

		)
	}

	return (
		<>
			{checkUser && checkUserEmail
				? <div>
					{
						orders && orders.map((order) => {
							return (
								<div key={order.totalPrice + order.customer + order.item + new Date()} className={style.orders}>
									<div className={style.order}>
										<h4>{order.customer}</h4>
										<p>{order.item}</p>
										<p className={style.price}>R {order.totalPrice.toFixed(2)}</p>
									</div>

									<div className={style.bin} onClick={() => {
										try {
											removeItem({ username: order.customer, item: order.item })

										} catch (error) {
										}
									}}>
										<BsFillTrashFill color='red' size={25} />

									</div>
								</div>
							)
						})
					}
				</div> : <div> Log in as Partner <Link href={'/'}>back</Link></div>

			}
		</>
	)
}

async function removeItem(item) {
	await fetch('/api/dashboard/removePlacedOrders', {
		method: 'POST',
		body: JSON.stringify(item),
		headers: {
			'Content-Type': 'application/json',
		}
	})
}