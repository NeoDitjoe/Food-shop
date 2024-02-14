import { client } from "../Database"

const db = client.db('menulist')

export default async function removeProduct(product){

  await db.collection('menu').deleteOne({product: product})
}

export async function removeItem(product, item){

  await db.collection('menu').updateOne(
    {product: product},
    {$pull: {menu: { item: item}}}
  )
  
}

