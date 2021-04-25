module.exports = function (sequelize, DataTypes) {
    const Vendor = sequelize.define("vendor", {
    company:{
        type: DataTypes.STRING,
        allowNull: false,         
    },
    address:{
        type: DataTypes.STRING,
        allowNull: true,            
    },
    city:{
        type: DataTypes.STRING,
        allowNull: true,         
    },
    state:{
        type: DataTypes.STRING(2),
        allowNull: true,         
    },   
    zip: {
        type: DataTypes.INTEGER,
        allowNull: true
    },     
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },     

});
return Vendor
};