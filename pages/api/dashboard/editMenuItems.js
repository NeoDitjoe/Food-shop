import editMenuItems from "@/database/dashboard.jsx/editMenuItems"


export default async function handler(req, res) {

  if (req.method === 'POST') {

    const { product, item, updateItem, updatePrice } = req.body

    try {
      await editMenuItems(product, item, updateItem, updatePrice)
      res.status(200).json({ message: 'success'})
    } catch (error) {
      res.status(417).json({ message: 'failed to update menu!, Check your internet connection!'})
    }
  }
}