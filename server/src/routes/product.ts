import {Router, Request, Response} from 'express';
import { productModel } from '../models/product';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const products = await productModel.find({})
        res.json(products)
    } catch (error) {
        res.status(400).json({error})
    }

})


router.post('/checkout', async (req: Request, res: Response) => {
    
})



export {router as productRouter}


// [{"_id":
//   {
//     "$oid":"66078238a3606b0c71b907d8"
//   },
//   "productName":"Airpods",
//   "price":67,
//   "description":"very good quality brother",
//   "stockQuantity":100,
//   "imageURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvR8EJFOkTWTA156k_uKKiNF5XNs8nKJ57b8xvjmb39Q&s"
// }]