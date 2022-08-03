const Order = require('../models/orderModel.js');
const Product = require('../models/productModel.js');

const addNewOrder = async (order) =>{
    const addOrder = new Order(order);

    const orderAdded = await addOrder.save();
    if(orderAdded){
        return orderAdded;
    }
}

const findOrder = async (userId) =>{
    try{
        const obj = await Order.find({userId});
        return obj;
    }catch(err){
        console.log(err);
    }
}

const findOrderById = async (orderId) =>{
    try{
        const obj = await Order.findOne({_id:orderId});
        return obj;
    }catch(err){
        console.log(err);
    }
}

const addProductToOrder = async (orderId, productId) =>{
    const product = await Product.findById(productId);
    if(product){
        const item = {
            productId: productId,
            price: product.price
        }    
        const order = await Order.findOneAndUpdate({_id: orderId}, {$push: {items: item}}, {new: true});
        if(order){
            const updatedOrder = await updatePrices(order);
            if(updatedOrder){
                return updatedOrder;
            }
        }
    }
}

const updatePrices = async (orderObj) =>{
    let price = 0;

    for(let item of orderObj.items){
        price+= item.price;
    } 
    orderObj.itemsPrice = price;
    orderObj.taxPrice = orderObj.itemsPrice*18/100;
    orderObj.totalPrice = orderObj.itemsPrice + orderObj.taxPrice;

    const result = await orderObj.save({validateBeforeSave: false});
    return result;
}

const removeProductFromOrder = async (orderId, productId) =>{
    const product = await Product.findById(productId);
    if(product){
        const item = {
            productId: productId,
            price: product.price
        }    
        const order = await Order.findOneAndUpdate({_id: orderId}, {$pull: {items: item}}, {new: true});
        if(order){
            const updatedOrder = await updatePrices(order);
            if(updatedOrder){
                return updatedOrder;
            }
        }
    }
}

module.exports.removeProductFromOrder = removeProductFromOrder;
module.exports.addProductToOrder = addProductToOrder;
module.exports.findOrderById = findOrderById;
module.exports.addNewOrder = addNewOrder;
module.exports.findOrder = findOrder;