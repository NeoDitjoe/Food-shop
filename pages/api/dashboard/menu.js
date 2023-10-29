import { getMenuList } from "@/database/Database"
import menuData from "@/database/helpers/dashboard/menu"

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

    try{

      await menuData(product, addData, res)
    }catch(error){
      res.status(404).json({message: error.message})
      return;
    }

    res.status(201).json({ message: 'Successfully stored!', message: product });
  }
}
