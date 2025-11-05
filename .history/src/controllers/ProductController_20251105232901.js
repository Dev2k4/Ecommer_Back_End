const { message } = require('antd');
const productService = require('../services/ProductService');

const createProduct = async (req,res) => {
    try{
        const {name, image, type, price, rating, countInStock, description} = req.body
        if(!name || !image || !type ||  !price ||  !rating||  !countInStock||  !description){
            return  res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const result = await productService.createProduct(req.body)
        return res.status(200).json(result)
    }catch(e) {
        console.error(e);
        return res.status(404).json({
            message: e.message
        })
    }
}
const updateProduct = async (req, res) => {
    try{
        const productId = req.params.id
        const data = req.body
        const response = await productService.updateProduct(productId, data)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e.message
        })
    }
}
const getDetailProduct = async (req,res) => {
    try{
        const productId = req.params.id
        const response = await productService.getDetailProduct(productId)
        console.log("headers.token:", req.headers.token);
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e.message
        })
    }
}
const deleteProduct = async (req,res) => {
    try{
        const productId = req.params.id
        const response = await productService.deleteProduct(productId)
        return res.status(200).json(response) 
    }catch(e){
        return res.status(404).json({
            message: e.message
        })
    }
}
const getAllProduct = async(req,res)=>{
    try{
        const{limit, page, sort, filter} = req.query
        const response = await productService.getAllProduct(limit, page, sort, filter)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e.message
        })
    }
}
const deleteManyProduct = async (req, res) => {
  try {
    const {ids} = req.body;
    if(!ids) {
      return res.status(200).json({
        status: "ERR",
        message: "The ids is required"
      })
    }
    const response = await prService.deleteManyProduct(ids);
    return res.status(200).json({ response });
  } catch (e) {
    console.error(e);
    return res.status(404).json({
      message: e.message,
    });
  }
};
module.exports = {
    createProduct, 
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct, 
    deleteManyProduct,
}