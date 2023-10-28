import { getMenuList, client } from "@/database/Database"

export default async function handler(req, res) {

  if( req.method === 'GET'){
    try{
      const menuList = await getMenuList('menulist', 'menu')

      res.status(200).json({ menu: menuList})
    }catch {
      res.status(404).json({ message: 'Reload Page'})
    }
  }

  if(req.method === 'POST'){
    const { product, menu, image } = req.body

    if(!product){
      res.status(402).json({message: "Invalid Input"})
      return;
    }

    const addData = {
      image,
      product,
      menu
    }

    const db = client.db('menulist')

    const productExist = await db.collection('menu').findOne({ product: product })

    if(productExist){
      res.status(400).json({ message: 'Product  already inserted' })
      return;
    }

    try{
      const result = await db.collection('menu').insertOne(addData)
      addData._id = result.insertedId
    }catch(error){
      res.status(404).json({message: 'Attempt Failed'})
      return;
    }

    res.status(201).json({ message: 'Successfully stored!', message: product });
  }
}
