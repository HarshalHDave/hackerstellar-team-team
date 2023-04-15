/**
 * portfolio.js
 * @description :: sequelize model of database table portfolio
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Portfolio = sequelize.define('portfolio',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER },
  isWish:{ type:DataTypes.BOOLEAN },
  investment_id:{ type:DataTypes.INTEGER },
  investment_name:{ type:DataTypes.STRING },
  price:{ type:DataTypes.STRING },
  ltp:{ type:DataTypes.STRING },
  qty:{ type:DataTypes.STRING },
  comapny_name:{ type:DataTypes.STRING },
  investment_type:{ type:DataTypes.STRING },
  blob:{ type:DataTypes.STRING }
}
,{
  hooks:{
    beforeCreate: [
      async function (portfolio,options){
        portfolio.isActive = true;
        portfolio.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (portfolio,options){
        if (portfolio !== undefined && portfolio.length) { 
          for (let index = 0; index < portfolio.length; index++) { 
        
            const element = portfolio[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Portfolio.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Portfolio);
sequelizePaginate.paginate(Portfolio);
module.exports = Portfolio;
