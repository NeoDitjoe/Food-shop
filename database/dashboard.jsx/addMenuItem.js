import { client } from "../Database";

export async function updateMenu(product, Additem, Addprice, special,  res) {

  const db = client.db('menulist')

  const itemExist = await db.collection('menu').findOne({ 'menu.item': Additem })

  if (itemExist) {
    res.status(417).json({ message: 'Item already exist' })
    return
  } else {

    await db.collection('menu').updateOne({

      product: product
    }, {
      $push: {
        menu: { item: Additem, price: Addprice, special }
      }
    });

  }

}