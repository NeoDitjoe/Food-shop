import removeProduct from "@/database/remove"


export default async function handler(req, res) {
  
  if(req.method === 'DELETE') {
     
    const { product } = req.query

    try {
      await removeProduct(product)
      res.status(200).json({ message: 'success'})
    } catch (error) {
      res.status(417).json({ message: 'failed to remove product'})
    }
  }
}