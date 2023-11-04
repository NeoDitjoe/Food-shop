import { getSearchDdata } from "@/database/Database";


export default async function handle(req, res){

    if( req.method === 'GET'){

        const input = req.query.input || ''

        try{
            const results = await getSearchDdata(input)
            res.status(200).json({ results : results})
        }catch(error){
            res.status(417).json({ message : error})
        }
    }
}
