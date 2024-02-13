import { client } from "../Database";


export default async function getSingleProduct(product) {

  const db = client.db('menulist')

  const results = await db.collection('menu').aggregate([
    {$match: { product : product}},
    {$project: { _id: 0}}
  ]).toArray()

  return results
}