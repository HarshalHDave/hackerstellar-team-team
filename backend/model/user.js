/**
 * user.js
 * @description :: sequelize model of database table user
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const bcrypt = require('bcrypt');
let User = sequelize.define('user',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    unique:true
  },
  password:{ type:DataTypes.STRING },
  email:{ type:DataTypes.STRING },
  name:{ type:DataTypes.STRING },
  userType:{ type:DataTypes.INTEGER },
  isActive:{ type:DataTypes.BOOLEAN },
  isDeleted:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER },
  phone_number:{ type:DataTypes.STRING },
  profile_img:{ type:DataTypes.STRING },
  sign_img:{ type:DataTypes.STRING },
  address_line_1:{ type:DataTypes.STRING },
  address_line_2:{ type:DataTypes.STRING },
  crater_name:{ type:DataTypes.STRING },
  colony_name:{ type:DataTypes.STRING },
  pincode:{ type:DataTypes.STRING },
  age:{ type:DataTypes.INTEGER },
  profession:{ type:DataTypes.STRING },
  experience:{ type:DataTypes.STRING },
  dob:{ type:DataTypes.DATE },
  hobbies:{ type:DataTypes.STRING },
  SDGs:{ type:DataTypes.STRING },
  investment_frequency:{ type:DataTypes.STRING },
  company_domains:{ type:DataTypes.STRING },
  impact_domains:{ type:DataTypes.STRING },
  notif_token:{ type:DataTypes.STRING },
  isAuth:{ type:DataTypes.BOOLEAN },
  blob:{ type:DataTypes.STRING },
  mobileNo:{ type:DataTypes.STRING }
}
,{
  hooks:{
    beforeCreate: [
      async function (user,options){
        if (user.password){ user.password =
          await bcrypt.hash(user.password, 8);}
        user.isActive = true;
        user.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (user,options){
        if (user !== undefined && user.length) { 
          for (let index = 0; index < user.length; index++) { 
            const element = user[index];
            if (element.password){ 
              element.password = await bcrypt.hash(element.password, 8);
            }
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
    afterCreate: [
      async function (user,options){
        sequelize.model('userAuthSettings').create({ userId:user.id });
      },
    ],
  }
}
);
User.prototype.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};
User.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  delete values.password;
  return values;
};
sequelizeTransforms(User);
sequelizePaginate.paginate(User);
module.exports = User;
