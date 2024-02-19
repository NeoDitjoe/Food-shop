import { updateMenu } from "@/database/dashboard.jsx/addMenuItem";

export default async function handler(req, res) {
    if(req.method === 'POST'){

        const { product, item, price, special } = req.body

        try{
            await updateMenu(product, item, price, special, res)
        
        }catch(error){
            res.status(417).json({message: 'Attempt Failed'})
            return;
        }

        res.status(201).json({ message: 'Successfully stored!' });
    }
}