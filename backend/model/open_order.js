/**
 * open_order.js
 * @description :: sequelize model of database table open_order
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Open_order = sequelize.define('open_order',{
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
  isOpen:{ type:DataTypes.BOOLEAN },
  qty:{ type:DataTypes.INTEGER },
  strike_price:{ type:DataTypes.STRING },
  isSelled:{ type:DataTypes.BOOLEAN },
  isCancelled:{ type:DataTypes.BOOLEAN },
  isin:{ type:DataTypes.STRING },
  investment_id:{ type:DataTypes.INTEGER },
  isCo_own:{ type:DataTypes.BOOLEAN },
  blob:{ type:DataTypes.STRING }
}
,{
  hooks:{
    beforeCreate: [
      async function (open_order,options){
        open_order.isActive = true;
        open_order.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (open_order,options){
        if (open_order !== undefined && open_order.length) { 
          for (let index = 0; index < open_order.length; index++) { 
        
            const element = open_order[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Open_order.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Open_order);
sequelizePaginate.paginate(Open_order);
module.exports = Open_order;
