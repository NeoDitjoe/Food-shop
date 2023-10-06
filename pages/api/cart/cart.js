import { connectDatabase } from "@/database/Database";

export default async function Handler(req, res){

    // const { user } = StateContext()
    let client;

    try{
        client = await connectDatabase('cart')
    }catch(error){
        res.status(400).json({ message: error || 'Failed Attempt'})
    }

    if( req.method === 'POST'){

        const { product,  item, price, user, img } = req.body
        
        const db = client.db()

        try{
            await db.collection('pendingOrders').insertOne({
                product: product,
                img: img,
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

    if( req.method === 'GET'){
        const db = client.db()
        let userOrders;

        try{
            userOrders = await db.collection('pendingOrders').find({ user: 'ditjoeneo33@gmail.com' }).toArray()
            res.status(200).json({ orders: userOrders})
        }catch(error){
            res.status(417).json({ message: error })
        }
    }
    
}