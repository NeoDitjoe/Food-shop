import { getMenuList, connectDatabase } from "@/database/Database"

export default async function handler(req, res) {

  let client;
  try {
      client = await connectDatabase('menulist')
  } catch(error){
      res.status(500).json({message: 'failed to retrieve data'})
      return;
  }

  if( req.method === 'GET'){
    try{
      const menuList = await getMenuList('menu')

      // client.close()
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

    const db = client.db()

    try{
      const result = await db.collection('menu').insertOne(addData)
      addData._id = result.insertedId
    }catch(error){
      client.close();
      res.status(404).json({message: 'Attempt Failed'})
      return;
    }

    client.close()

    res.status(201).json({ message: 'Successfully stored!', message: product });
  }
}
