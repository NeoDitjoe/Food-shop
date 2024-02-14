import { removeItem } from "@/database/dashboard.jsx/remove"

export default async function handler(req, res) {

  if (req.method === 'POST') {
    const { product, item } = req.body

    try {
      await removeItem(product, item)
      res.status(200).json({ message: 'success'})
    } catch (error) {
      res.status(417).json({ message: 'failed to remove product'})
    }
  }
}