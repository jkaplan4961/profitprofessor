module.exports = function (sequelize, DataTypes) {
    const Marketplace = sequelize.define("marketplace", {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    commission: {
        type: DataTypes.FLOAT,
        allowNull: true, 
        defaultValue: 0
    },
    shipping_price: {
        type: DataTypes.FLOAT,
        allowNull: true, 
        defaultValue: 0
    }
});
return Marketplace
};
