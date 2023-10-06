import { connectDatabase } from "@/database/Database";

export default async function handler( req, res){
    if( req.method === 'POST'){
        const { item, price  } = req.body

        if( !item || !price  ){
            res.status(400).json({ message: 'Failed'})
            return;
        }

        const client = await connectDatabase('cart')
        
        const db = client.db()

        const result = await db.collection('placedOrders').insertOne({
            item: item,
            totalPrice: price
        })

        res.status(201).json({ message: 'success'})
    }
}