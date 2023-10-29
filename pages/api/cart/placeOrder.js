import { client, getCartList } from "@/database/Database";

export default async function handler( req, res){
    if( req.method === 'POST'){
        const { item, price, customer  } = req.body

        if( !item || !price  ){
            res.status(400).json({ message: 'Failed'})
            return;
        }

        const db = client.db('cart')

        const result = await db.collection('placedOrders').insertOne({
            item: item,
            totalPrice: price,
            customer: customer
        })

        res.status(201).json({ message: 'success'})
    }

    if(req.method === 'GET'){

        const user = req.query.user || ''

        try{
            const results = await getCartList('cart', 'pendingOrders', user)
            res.status(200).json({ cart: results})

        }catch(error){
            res.status(417).json({ message: 'failed to load' , error})
        }
    }
}