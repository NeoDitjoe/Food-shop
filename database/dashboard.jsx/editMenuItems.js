import { client } from "../Database";

export default async function editMenuItems(product, item, updateItem, updatePrice, special) {

  const db = client.db('menulist')

  await db.collection('menu').updateOne(
    {product: product, 'menu.item': item},

    {
      $set: { 'menu.$.item': updateItem, 'menu.$.price': updatePrice, 'menu.$.special': special }
    }
  )
}

