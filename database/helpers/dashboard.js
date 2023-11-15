import { client } from "../Database";

export default async function menuData(product, addData, res){

    const db = client.db('menulist')

    const productExist = await db.collection('menu').findOne({ product: product })

    if(productExist){
      res.status(400).json({ message: 'You already have this product, use the update form' })
      return;
    }

    await db.collection('menu').insertOne(addData)

}

export function removePlaceOrder( username, item){

    const db = client.db('cart')

    db.collection('placedOrders').deleteOne({customer: username, item : item})
}

export async function updateMenu(product, item, price){

  const db = client.db('menulist')

  await db.collection('menu').updateOne({
      
  product: product
  }, {
      $push: {
      menu: { price: price, item: item}
      }
  });
}

