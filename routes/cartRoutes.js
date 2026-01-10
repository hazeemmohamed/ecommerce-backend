const express = require("express")
const { addCart, getCartItems } = require("../controllers/cartController")

const router = express.Router()

router.post("/add-cart",addCart)
router.get("/getcart/:userId",getCartItems)


module.exports=router