import { removePlaceOrder } from "@/database/helpers/dashboard"

export default async function handler(req, res){

    const { username, item } = req.body

    if( req.method === 'POST'){

        try{
            removePlaceOrder(username, item)
            res.status(200).json({ message: 'removed item' })

        }catch(error){
            res.status(417).json({ message: error})
        }
    }
}