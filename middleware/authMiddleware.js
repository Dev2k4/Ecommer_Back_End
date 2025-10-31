const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers?.token?.split(' ')[1]
        if (!token) {
            return res.status(401).json({
                status: 'ERR',
                message: 'Token is required'
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    status: 'ERR',
                    message: 'Invalid or expired token'
                })
            }
            if (decoded.isAdmin) {
                next()
            } else {
                return res.status(403).json({
                    status: 'ERR',
                    message: 'Not authorized as admin'
                })
            }
        })
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message
        })
    }
}

const authUserMiddleware = (req, res, next) => {
    try {
        const token = req.headers?.token?.split(' ')[1]
        if (!token) {
            return res.status(401).json({
                status: 'ERR',
                message: 'Token is required'
            })
        }

        const userId = req.params.id
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    status: 'ERR',
                    message: 'Invalid or expired token'
                })
            }
            if (decoded.isAdmin || decoded.id === userId) {
                next()
            } else {
                return res.status(403).json({
                    status: 'ERR', 
                    message: 'Not authorized'
                })
            }
        })
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message
        })
    }
}

module.exports = {
    authMiddleware,
    authUserMiddleware
}