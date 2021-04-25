require("dotenv").config();
const express = require("express")
const app = express();
const cors = require("cors");
const sequelize =require("./db")

let user = require('./controller/usercontroller');
let marketplace = require('./controller/marketplacecontroller');
let product = require('./controller/productcontroller');
let vendor = require('./controller/vendorcontroller');
app.use(require('./middleware/headers'));

sequelize.sync();
// sequelize.sync({force: true});

app.use(express.json());
app.use(cors());

app.use('/user', user)
app.use('/marketplace', marketplace)
app.use('/product', product)
app.use('/vendor', vendor)

app.listen(3001, () => {
    console.log("app is listening on 3001")
})
// const port = process.env.PORT || 3001

// db.authenticate()
//     .then(() => db.sync())
//     .then(() => 
//         app.listen(port, () => {
//             console.log(`server is listening on port ${port}`)
//         })
//     )


// module.exports = {
//     marketplace,
//     product,
//     user,
//     vendor,
// }