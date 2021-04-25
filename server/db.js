const Sequelize = require("sequelize");
const sequelize = new Sequelize("profit_professor", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

sequelize.authenticate().then(
    function(){
        console.log('connected to profit professor');
    },
    function(err){
        console.log(err);
    }
);

User = sequelize.import("./models/user");
Marketplace = sequelize.import("./models/marketplace");
Product = sequelize.import("./models/product");
Vendor = sequelize.import("./models/vendor");

User.hasMany(Product);
Product.belongsTo(User)

Vendor.hasMany(Product);
Product.belongsTo(Vendor);

Marketplace.hasMany(Product);
Product.belongsTo(Marketplace);

module.exports=sequelize