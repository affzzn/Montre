import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


import {userRouter} from './routes/user'

const app = express();

app.use(express.json())
app.use(cors())


app.use('/user', userRouter)

mongoose.connect("mongodb+srv://affan1708:ecommercePassword@ecommerce.y93cjct.mongodb.net/ecommerce")

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})