const { default: mongoose } = require("mongoose")

const validateObjectId = (req, res, next) => {
    const _id = req.params.id

    if(!_id){
        return res.status(400).json({
            status: "ERR",
            message: "Missing ID in request params"
        })
    }
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({
            status: "ERR",
            message: "Invalid ID format"
        })
    }
    next()
}
module.exports = validateObjectId