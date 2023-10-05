import { connectDatabase } from "@/database/Database";

export default async function Handler(req, res){

    if( req.method === 'POST'){

        const { item, price, user } = req.body

        let client;
    
        try{
            client = await connectDatabase('cart')
        }catch(error){
            res.status(400).json({ message: error || 'Failed Attempt'})
        }
        
        const db = client.db()

        try{
            await db.collection('placedOrders').insertOne({
                user: user,
                item: item,
                price: price
            })
        }catch(error){
            client.close()
            res.status(417).json({ message: error || 'Failed Attempt' }) //expectation failed
            return;
        }

        client.close()
        res.status(200).json({ message: 'Order in cart'}) //Ok
    }
    
}