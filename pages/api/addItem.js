import { connectDatabase } from "@/database/Database";

export default async function handler(req, res) {
    if(req.method === 'POST'){

        const { product, item, price } = req.body
  
        let client = await connectDatabase()

        const db = client.db('menulist')

        try{
        const result = await db.collection('menu').updateOne({
            
        product: product
        }, {
            $push: {
            menu: { price: price, item: item}
            }
        });
        
        }catch(error){
            client.close();
            res.status(417).json({message: 'Attempt Failed'})
            return;
        }

        client.close()

        res.status(201).json({ message: 'Successfully stored!' });
    }
}