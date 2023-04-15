/**
 * portfolioValidation.js
 * @description :: validate each post and put request as per portfolio model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of portfolio */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  isWish: joi.boolean(),
  investment_id: joi.number().integer().allow(0),
  investment_name: joi.string().allow(null).allow(''),
  price: joi.string().allow(null).allow(''),
  ltp: joi.string().allow(null).allow(''),
  qty: joi.string().allow(null).allow(''),
  comapny_name: joi.string().allow(null).allow(''),
  investment_type: joi.string().allow(null).allow(''),
  blob: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of portfolio for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  isWish: joi.boolean(),
  investment_id: joi.number().integer().allow(0),
  investment_name: joi.string().allow(null).allow(''),
  price: joi.string().allow(null).allow(''),
  ltp: joi.string().allow(null).allow(''),
  qty: joi.string().allow(null).allow(''),
  comapny_name: joi.string().allow(null).allow(''),
  investment_type: joi.string().allow(null).allow(''),
  blob: joi.string().allow(null).allow(''),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of portfolio for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isWish: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      investment_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      investment_name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      price: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      ltp: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      qty: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      comapny_name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      investment_type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      blob: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
