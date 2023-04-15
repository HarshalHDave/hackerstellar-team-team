/**
 * investment.js
 * @description :: sequelize model of database table investment
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Investment = sequelize.define('investment',{
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
  name:{ type:DataTypes.STRING },
  sub_heading:{ type:DataTypes.STRING },
  description:{ type:DataTypes.STRING },
  company_img:{ type:DataTypes.STRING },
  comapny_name:{ type:DataTypes.STRING },
  investment_type:{ type:DataTypes.STRING },
  company_size:{ type:DataTypes.STRING },
  comany_desc:{ type:DataTypes.STRING },
  risk:{ type:DataTypes.STRING },
  market_cap:{ type:DataTypes.STRING },
  country:{ type:DataTypes.STRING },
  founding_year:{ type:DataTypes.STRING },
  investment_time:{ type:DataTypes.STRING },
  SDG_solved:{ type:DataTypes.STRING },
  industry:{ type:DataTypes.STRING },
  min_amnt_invest:{ type:DataTypes.STRING },
  impact_categorey:{ type:DataTypes.STRING },
  blob:{ type:DataTypes.STRING },
  blob2:{ type:DataTypes.STRING },
  blob3:{ type:DataTypes.STRING }
}
,{
  hooks:{
    beforeCreate: [
      async function (investment,options){
        investment.isActive = true;
        investment.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (investment,options){
        if (investment !== undefined && investment.length) { 
          for (let index = 0; index < investment.length; index++) { 
        
            const element = investment[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Investment.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Investment);
sequelizePaginate.paginate(Investment);
module.exports = Investment;
