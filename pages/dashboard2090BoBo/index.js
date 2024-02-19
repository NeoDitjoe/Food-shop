import StateContext from "@/usecontext/stateContext";
import Link from "next/link";
import { Fragment } from "react";

export default function Dashboard() {

	const {  userOnly } = StateContext()

	return (
		<Fragment>
			{
				userOnly
					? 'dashboard'
					: <div>
						{'Click '}
						<Link href={'/'}>here</Link>
					</div>
			}
		</Fragment>

	)
}