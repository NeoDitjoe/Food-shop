import { client } from "@/database/Database";

export default async function handler(req, res){

    const { username, item } = req.body

    if( req.method === 'POST'){

        try{
            const db = client.db('cart')

            db.collection('placedOrders').deleteOne({customer: username, item : item})
            res.status(200).json({ message: 'removed item' })

        }catch(error){
            res.status(417).json({ message: error})
        }

    }
}