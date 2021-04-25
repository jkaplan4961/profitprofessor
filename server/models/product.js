module.exports = function (sequelize, DataTypes) {
    const Products = sequelize.define("product", {
    name:{
        type: DataTypes.STRING,
        allowNull: false,         
    },
    description:{
        type: DataTypes.STRING(100),
        allowNull: false,             
    },
    manufacturer:{
        type: DataTypes.STRING,
        allowNull: false,         
    },
    upc:{
        type: DataTypes.INTEGER,
        allowNull: true,         
    },   
    part_num: {
        type: DataTypes.INTEGER,
        allowNull: true
    },     
    packaging: {
        type: DataTypes.FLOAT,
        allowNull: true
    },     
    shipping_cost: {
        type: DataTypes.FLOAT,
        allowNull: true
    },  
    image: {
        type: DataTypes.STRING,
    allowNull: true
    },    
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false
    }     
});
// Product.associate
return Products
};