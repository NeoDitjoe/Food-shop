
import Chart from "@/components/dashboard/chart/chart";
import getUsers from "@/database/dashboard.jsx/getUsers";
import StateContext from "@/usecontext/stateContext";
import Link from "next/link";
import { Fragment } from "react";

export default function Dashboard(props) {

	const { users } = props 

	const { userOnly } = StateContext()

	return (
		<Fragment>
			{
				userOnly
					? <Chart
						users={users}
					/>
					: <div>
						{'Click '}
						<Link href={'/'}>here</Link>
					</div>
			}
		</Fragment>

	)
}

export async function getServerSideProps() {
	const users = await getUsers()

	return{
		props: {
			users
		}
	}
}