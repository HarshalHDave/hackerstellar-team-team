/**
 * investmentValidation.js
 * @description :: validate each post and put request as per investment model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of investment */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  name: joi.string().allow(null).allow(''),
  sub_heading: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  company_img: joi.string().allow(null).allow(''),
  comapny_name: joi.string().allow(null).allow(''),
  investment_type: joi.string().allow(null).allow(''),
  company_size: joi.string().allow(null).allow(''),
  comany_desc: joi.string().allow(null).allow(''),
  risk: joi.string().allow(null).allow(''),
  market_cap: joi.string().allow(null).allow(''),
  country: joi.string().allow(null).allow(''),
  founding_year: joi.string().allow(null).allow(''),
  investment_time: joi.string().allow(null).allow(''),
  SDG_solved: joi.string().allow(null).allow(''),
  industry: joi.string().allow(null).allow(''),
  min_amnt_invest: joi.string().allow(null).allow(''),
  impact_categorey: joi.string().allow(null).allow(''),
  blob: joi.string().allow(null).allow(''),
  blob2: joi.string().allow(null).allow(''),
  blob3: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of investment for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  name: joi.string().allow(null).allow(''),
  sub_heading: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  company_img: joi.string().allow(null).allow(''),
  comapny_name: joi.string().allow(null).allow(''),
  investment_type: joi.string().allow(null).allow(''),
  company_size: joi.string().allow(null).allow(''),
  comany_desc: joi.string().allow(null).allow(''),
  risk: joi.string().allow(null).allow(''),
  market_cap: joi.string().allow(null).allow(''),
  country: joi.string().allow(null).allow(''),
  founding_year: joi.string().allow(null).allow(''),
  investment_time: joi.string().allow(null).allow(''),
  SDG_solved: joi.string().allow(null).allow(''),
  industry: joi.string().allow(null).allow(''),
  min_amnt_invest: joi.string().allow(null).allow(''),
  impact_categorey: joi.string().allow(null).allow(''),
  blob: joi.string().allow(null).allow(''),
  blob2: joi.string().allow(null).allow(''),
  blob3: joi.string().allow(null).allow(''),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of investment for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      sub_heading: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      company_img: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      comapny_name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      investment_type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      company_size: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      comany_desc: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      risk: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      market_cap: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      country: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      founding_year: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      investment_time: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      SDG_solved: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      industry: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      min_amnt_invest: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      impact_categorey: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      blob: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      blob2: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      blob3: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
