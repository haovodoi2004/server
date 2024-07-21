const express = require('express')
const app = express()
const database = require('./config/db')
const bodyParser = require('body-parser')

const CategoryAPI = require('./router/categoryAPI')
const ProductAPI = require('./router/productAPI')
const AccountAPI = require('./router/accountAPI')
const BillAPI = require('./router/billAPI')
app.use(bodyParser.json())
app.use(express.static('public/'))

app.listen(3000, () => {
    console.log('Server running on port 3000')
})
app.use('/api/category' , CategoryAPI)
app.use('/api/product' , ProductAPI)
app.use('/api/account' , AccountAPI)
app.use('/api/bill' , BillAPI)


database.connect()

