import {Router, Request, Response} from 'express';
import { productModel } from '../models/product';
import {userModel} from '../models/user'
import { PRODUCT_ERRORS, USER_ERRORS } from '../errors';

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
    const  {customerID, cartItems} = req.body

    // cartItems = {      // productID: quantity
    //     "60d3b41abdacab0026a733c6": 2,
    //     "60d3b41abdacab0026a733c7": 1,
    //     "60d3b41abdacab0026a733c8": 3
    // }

    try {
        const user = await userModel.findById(customerID)

        const productIDs = Object.keys(cartItems) // keys are productIDs in cartItems
        const products = await productModel.find({_id: {$in: productIDs}})
        
        if(!user){
            return res.status(404).json({type: USER_ERRORS.USER_NOT_FOUND})
        }


        if(products.length !== productIDs.length){
            return res.status(404).json({type: PRODUCT_ERRORS.PRODUCT_NOT_FOUND})
        }


        let totalPrice = 0
        for(const item in cartItems){
            const product = products.find((product) => String(product._id) === item)

            if(!product){
                return res.status(404).json({type: PRODUCT_ERRORS.PRODUCT_NOT_FOUND})
            }

            if(product.stockQuantity < cartItems[item]){
                return res.status(400).json({type: PRODUCT_ERRORS.INSUFFICIENT_STOCK})
            }

            totalPrice += (product.price * cartItems[item])
        }

        if(user.availableAmount < totalPrice){
            return res.status(400).json({type: PRODUCT_ERRORS.INSUFFICIENT_FUNDS})
        }

        user.availableAmount = user.availableAmount - totalPrice
        user.purchasedItems.push(...productIDs)
        await user.save() // save changes to user


        // update stockQuantity of products

        await productModel.updateMany({_id: {$in: productIDs}}, {$inc: {stockQuantity: -1}})

    } catch (error) {
        res.status(400).json({error})
    }

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