const express = require("express")
const dotenv = require("dotenv")
const path = require("path")
dotenv.config({path: path.join(__dirname, 'config', 'config.env')})
const connectDB = require("./config/connectDB")
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));


const products = require('./routes/product')
const orders = require('./routes/order')
const cart = require('./routes/cartRoutes')


connectDB()


app.use('/api/', products)
app.use('/api/orders',orders)
app.use('/api/cart', cart)
app.use("/uploads", express.static("uploads"));


app.listen(process.env.PORT, ()=>{
    console.log(`Server started on ${process.env.PORT}`)
})