import { getMenuList } from "@/database/Database"

export default function Orders({menuList}){

    return (
        <h1>Orders</h1>
    )
}

export async function getServerSideProps(){

    const menuList = await getMenuList('cart', 'placedOrders')
    
    return{
        props: {
            menuList
        }
    }
}