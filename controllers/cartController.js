const cartModel = require("../models/cartModel")


exports.addCart = async (req, res)=>{
    const {userId, productId, quantity} = req.body

    const cartItem = await cartModel.create({
        userId : userId,
        items:[
            {productId:productId,
        quantity:quantity
    }]
    })
    res.status(200).json(
        { 
            success: true, 
            cartItem 
        }
    );
}

exports.getCartItems = async (req,res)=>{
    const {userId} = req.params
    const carts =  await cartModel.find({userId}).populate("items.productId")
    res.status(200).json(
        {
            successs:true,
            carts
        }
    )
}