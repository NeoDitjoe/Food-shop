import { client } from "../../Database";

export default async function menuData(product, addData, res){

    const db = client.db('menulist')

    const productExist = await db.collection('menu').findOne({ product: product })

    if(productExist){
      res.status(400).json({ message: 'You already have this product, use the update form' })
      return;
    }

    const result = await db.collection('menu').insertOne(addData)

}