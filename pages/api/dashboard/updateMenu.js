import { updateMenu } from "@/database/helpers/dashboard";

export default async function handler(req, res) {
    if(req.method === 'POST'){

        const { product, item, price } = req.body

        try{
            await updateMenu(product, item, price)
        
        }catch(error){
            res.status(417).json({message: 'Attempt Failed'})
            return;
        }

        res.status(201).json({ message: 'Successfully stored!' });
    }
}