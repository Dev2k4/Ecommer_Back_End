const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require('cors')
dotenv.config()
const app = express()
const routes = require('./src/routes/index')
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')

const PORT  = process.env.PORT || 4000
const DATABASE = process.env.DATABASE
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true               
}))
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
routes(app)

mongoose.connect(DATABASE,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
.then(()=>{
    console.log("Connected DATABASE")
})
.catch((err) => {
    console.log("Connect DATABASE failed")
})

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
} ) 