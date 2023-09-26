import { getMenuList, connectDatabase } from "@/database/Database"

export default async function handler(req, res) {

  let client;
  try {
      client = await connectDatabase()
  } catch(error){
      res.status(500).json({message: 'Connecting to the database failed!'})
  }

  if( req.method === 'GET'){
    try{
      const menuList = await getMenuList(client, 'menu')
      res.status(200).json({ menu: menuList})
    }catch {
      res.status(404).json({ message: 'Reload Page'})
    }
  }

  if(req.method === 'POST'){
    const { inputValue } = req.body

    if(!inputValue){
      res.status(402).json({message: "Invalid Input"})
      return;
    }

    const addData = {
      inputValue
    }

    const db = client.db()

    try{
      const result = await db.collection('menu').insertOne(addData)
    }catch(error){
      client.close();
      res.status(404).json({message: 'Attempt Failed'})
    }

    client.close()

    res.status(201).json({ message: 'Successfully stored message!', message: inputValue });
  }
}
