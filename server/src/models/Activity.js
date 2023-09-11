const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Activity", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dificulty: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        time : {
            type: DataTypes.INTEGER,
            allowNull : true,
        
        validate: {
            isInt: true,
            min: 1,   
            max: 12,     
          },
        },
        season: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps:false,
    })
};