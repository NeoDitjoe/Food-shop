import { client } from "./Database"

export default async function removeProduct(product){

  const db = client.db('menulist')

  await db.collection('menu').deleteOne({product: product})
}