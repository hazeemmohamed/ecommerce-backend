const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    
    userId : {
        type:String,
        required: true
    },
    items:[
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                 ref:"Product",
            required:true,
            },
           
            quantity:{
                type:Number,
                required: true
            },
        },
    ],
},
    {timestamps:{type:true}}
)

const cartModel = mongoose.model("Cart", cartSchema)

module.exports= cartModel
