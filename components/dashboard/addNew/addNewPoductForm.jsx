import AddToMenuForm from './AddToMenuForm';
import style from 'styles/dashboard.module.css'
import { FormsGrid } from "@/components/grid";
import { Button } from "@/components/button/button";
import { useEffect, useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AddNewProduct() {

	const [showAddMenu, setShowAddMenu] = useState(false)
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

				<div className={style.main}>

					<Button 
          
            click={() => setShowAddMenu(!showAddMenu)} name={["Add new product ", showAddMenu ? <SlArrowUp /> : <SlArrowDown />]} />
					{showAddMenu ? <FormsGrid
						addMenu={<AddToMenuForm collection='menu' />}
					/> : ''}
					<br />
				</div>
			</div> : <div>Please log in with as partner <Link href={'/'}>back</Link></div>
			}
		</>
	)
}