import { getMenuList } from "@/database/Database"

export default async function  handler(req, res){

    if(req.method === "GET"){
        try{
            const results = await getMenuList('cart', 'placedOrders')

            res.status(200).json({ orders: results })
        }catch(error){
            res.status(417).json({ message : 'failed to fetch', error })
        }
    }
}