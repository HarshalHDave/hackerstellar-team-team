/**
 * userValidation.js
 * @description :: validate each post and put request as per user model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

const { USER_TYPES } = require('../../constants/authConstant');
const { convertObjectToEnum } = require('../common');  

/** validation keys and properties of user */
exports.schemaKeys = joi.object({
  password: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  userType: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  phone_number: joi.string().allow(null).allow(''),
  profile_img: joi.string().allow(null).allow(''),
  sign_img: joi.string().allow(null).allow(''),
  address_line_1: joi.string().allow(null).allow(''),
  address_line_2: joi.string().allow(null).allow(''),
  crater_name: joi.string().allow(null).allow(''),
  colony_name: joi.string().allow(null).allow(''),
  pincode: joi.string().allow(null).allow(''),
  age: joi.number().integer().allow(0),
  profession: joi.string().allow(null).allow(''),
  experience: joi.string().allow(null).allow(''),
  dob: joi.date().options({ convert: true }).allow(null).allow(''),
  hobbies: joi.string().allow(null).allow(''),
  SDGs: joi.string().allow(null).allow(''),
  investment_frequency: joi.string().allow(null).allow(''),
  company_domains: joi.string().allow(null).allow(''),
  impact_domains: joi.string().allow(null).allow(''),
  notif_token: joi.string().allow(null).allow(''),
  isAuth: joi.boolean(),
  blob: joi.string().allow(null).allow(''),
  mobileNo: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of user for updation */
exports.updateSchemaKeys = joi.object({
  password: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  userType: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  phone_number: joi.string().allow(null).allow(''),
  profile_img: joi.string().allow(null).allow(''),
  sign_img: joi.string().allow(null).allow(''),
  address_line_1: joi.string().allow(null).allow(''),
  address_line_2: joi.string().allow(null).allow(''),
  crater_name: joi.string().allow(null).allow(''),
  colony_name: joi.string().allow(null).allow(''),
  pincode: joi.string().allow(null).allow(''),
  age: joi.number().integer().allow(0),
  profession: joi.string().allow(null).allow(''),
  experience: joi.string().allow(null).allow(''),
  dob: joi.date().options({ convert: true }).allow(null).allow(''),
  hobbies: joi.string().allow(null).allow(''),
  SDGs: joi.string().allow(null).allow(''),
  investment_frequency: joi.string().allow(null).allow(''),
  company_domains: joi.string().allow(null).allow(''),
  impact_domains: joi.string().allow(null).allow(''),
  notif_token: joi.string().allow(null).allow(''),
  isAuth: joi.boolean(),
  blob: joi.string().allow(null).allow(''),
  mobileNo: joi.string().allow(null).allow(''),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of user for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      password: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      userType: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      phone_number: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      profile_img: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      sign_img: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      address_line_1: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      address_line_2: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      crater_name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      colony_name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      pincode: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      age: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      profession: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      experience: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      dob: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      hobbies: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      SDGs: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      investment_frequency: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      company_domains: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      impact_domains: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      notif_token: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isAuth: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      blob: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      mobileNo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
