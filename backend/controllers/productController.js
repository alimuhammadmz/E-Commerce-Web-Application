const express = require('express');
const {addNewProduct, getProductsByKeyword, findProduct, deleteProduct, updateProduct} = require('../services/productService');

const result2 = "Not found!";

const searchProductController = async (req, res, next)=>{
    const result = await getProductsByKeyword(req.query);
    if(!result)
        return res.status(404).json({'message':result2});

    return res.status(200).json({'message':result});
}

const getProductsByIdController = async (req, res, next) =>{
    const {id} = req.query;
    
    const result = await findProduct(id);
    if(!result)
        return res.status(404).json({'message':result2});
    
    return res.status(200).json({'message':result});
    
}

const createNewProductController = async (req, res) =>{
    const {product} = req.body;

    const result = await addNewProduct(product);
    
    console.log("Product Added Successfully!");
    if(!result)
        return res.status(400).json({'message':result2});
    return res.status(201).json({'message':result});
}

const deleteProductController = async (req, res, next) =>{
    const {id} = req.params;

    const result = await deleteProduct(id);
    if(!result)
        return res.status(404).json({'message':result2});
    return res.status(200).json({'message':result});
    
}

const updateProductController = async (req, res, next) =>{
    const {id} = req.params;
    const {updates} = req.body;

    const result = await updateProduct(id, updates);
    if(!result)
        return res.status(404).json({'message':result2});
    return res.status(200).json({'message':result});
}

module.exports.createNewProductController = createNewProductController;

module.exports.searchProductController = searchProductController;
module.exports.getProductsByIdController = getProductsByIdController;

module.exports.updateProductController = updateProductController;
module.exports.deleteProductController = deleteProductController;

