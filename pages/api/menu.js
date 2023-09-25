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
}
