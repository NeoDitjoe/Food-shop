import { client } from "@/database/Database";

export default async function handler(req, res) {
    if(req.method === 'POST'){

        const { product, item, price } = req.body
  

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
            res.status(417).json({message: 'Attempt Failed'})
            return;
        }

        res.status(201).json({ message: 'Successfully stored!' });
    }
}