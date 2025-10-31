const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const router = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
}

















module.exports = router