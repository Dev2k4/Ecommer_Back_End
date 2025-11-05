const { message } = require("antd")
const Product = require("../models/ProductModel")

const createProduct = async (newProduct) => {
    const {name, image, type, price, rating, countInStock, description} = newProduct
    try{
        const createNewProduct = await Product.create({
            name: name, 
            image: image, 
            type: type, 
            rating :rating,
            price: price, 
            countInStock: countInStock, 
            description: description
        })
        return {
            status: "OK", 
            message: "Create product successful",
            data: createNewProduct
        }
    }catch(e){
        throw(e)
    }
}
const updateProduct = async (productId, data) => {
    try{
        const checkProduct = await Product.findById(productId)
        if(checkProduct === null){
            return{
                status: "ERR",
                message: "id product not exist"
            }
        }
        const response = await Product.findByIdAndUpdate(productId, data, {new: true})
        return{
            status: "OK",
            message: "update product successful",
            data: response
        }
    } catch(e){
        throw(e)
    }
}
const getDetailProduct = async (productId) => {
    try{
        const checkProduct = await Product.findById(productId)
        if(checkProduct === null){
            return{
                status: "ERR",
                message: "Product is required"
            }
        }
        return {
            status: "OK",
            message: "Get detail Product successful",
            data: checkProduct
        }
    }catch(e){
        throw(e)
    }
}
const deleteProduct= async(productId) => {
    try{    
        const checkProduct = await Product.findById(productId)
        if(checkProduct === null){
            return{
                status: "ERR",
                message: "Product is required"
            }
        }
        await Product.findByIdAndDelete(productId)
        return {
            status: "OK",
            message: "Product delete successful"
        }
    }catch(e){
        throw(e)
    }
}
const getAllProduct = async (limit, page, sort, filter) => {
    try{
        const totalProduct = await Product.estimatedDocumentCount()
        const totalPage = Math.ceil(Number(totalProduct)/Number(limit))
        if(filter){
            console.log(filter)
            const objectFilter = {}
            objectFilter[filter[1]] = filter[0]
            const allProductFilter = await (await Product.find(objectFilter).limit(Number(limit)).skip((Number(page)-1)*Number(limit)))
            return{
            status: "OK",
            message: "Get all product successful",
            data: allProductFilter,
            total: totalProduct,
            pageCurrent: page,
            totalPage: totalPage
        }
        // if(sort){
        //     const objectSort = {}
        //     objectSort[sort[1]] = sort[0]
        //     const allProductSort = await Product.find().limit(Number(limit)).skip((Number(page)-1)*Number(limit)).sort(objectSort)
        //     return{
        //     status: "OK",
        //     message: "Get all product successful",
        //     data: allProductSort,
        //     total: totalProduct,
        //     pageCurrent: page,
        //     totalPage: totalPage
        // }
        } else{
            const allProduct = await Product.find().limit(Number(limit)).skip((Number(page)-1)*Number(limit))
            return{
            status: "OK",
            message: "Get all product successful",
            data: allProduct,
            total: totalProduct,
            pageCurrent: page,
            totalPage: totalPage
        }
        }
        
        
    }catch(e){
        throw(e)
    }
}
const deleteManyProduct = async(ids) => {
try {
    await User.findByIdAndDelete({_id: ids});
    return { status: "OK", message: "User DELETED successfully" };
  } catch (e) {
    throw e;
  }
}
module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct, 
    getAllProduct,
}