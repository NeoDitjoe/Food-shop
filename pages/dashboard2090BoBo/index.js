import AddToMenuForm from "@/Dashboard/AddToMenuForm";
import UpdateMenuForm from "@/Dashboard/updateMenuForm";
import style from 'styles/dashboard.module.css'
import { FormsGrid } from "@/components/grid";
import LinkButton, { Button } from "@/components/button/button";
import { useEffect, useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Dashboard() {

	const [showAddMenu, setShowAddMenu] = useState(false)
	const [showSpecialsForm, setShowSpecialsForm] = useState(false)
	const { data: session} = useSession()
	const [username, setUserName] = useState('')
	const [userEmail, setUserEmail] = useState('')

	useEffect(() => {
		setUserName(session && session.user.email[1])
		setUserEmail(session && session.user.email[0])
	})

	const checkUser = username === 'administratorbobo'
	const checkUserEmail = userEmail === 'martins@gmail.com'

	return (
		<>
			{
				checkUser && checkUserEmail 
				? <div>
				<button className={style.button}>
					<LinkButton link={'dashboard2090BoBo/orders'} text='View Orders' />
				</button>

				<div className={style.main}>

					<Button click={() => setShowAddMenu(!showAddMenu)} name={["Order Now Menu ", showAddMenu ? <SlArrowUp /> : <SlArrowDown />]} />
					{showAddMenu ? <FormsGrid
						addMenu={<AddToMenuForm collection='menu' />}
						updateMenu={<UpdateMenuForm collection='menu' />}
					/> : ''}
					<br />

					<Button click={() => setShowSpecialsForm(!showSpecialsForm)} name={["Specials ", showSpecialsForm ? <SlArrowUp /> : <SlArrowDown />]} />
					{showSpecialsForm ? <FormsGrid
						addMenu={<AddToMenuForm collection='specials' />}
						updateMenu={<UpdateMenuForm collection='specials' />}
					/> : ''}
				</div>
			</div> : <div>Please log in with as partner <Link href={'/'}>back</Link></div>
			}
		</>
	)
}