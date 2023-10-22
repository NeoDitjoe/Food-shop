import { connectDatabase } from "@/database/Database";

export default async function handler( req, res){
    if( req.method === 'POST'){
        const { item, price, customer  } = req.body

        if( !item || !price  ){
            res.status(400).json({ message: 'Failed'})
            return;
        }

        const client = await connectDatabase()
        
        const db = client.db('cart')

        const result = await db.collection('placedOrders').insertOne({
            item: item,
            totalPrice: price,
            customer: customer
        })

        res.status(201).json({ message: 'success'})
    }
}