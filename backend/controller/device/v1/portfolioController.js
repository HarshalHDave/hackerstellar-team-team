/**
 * portfolioController.js
 * @description :: exports action methods for portfolio.
 */

const Portfolio = require('../../../model/portfolio');
const portfolioSchemaKey = require('../../../utils/validation/portfolioValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Portfolio in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Portfolio. {status, message, data}
 */ 
const addPortfolio = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      portfolioSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdPortfolio = await dbService.createOne(Portfolio,dataToCreate);
    return  res.success({ data :createdPortfolio });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Portfolio in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Portfolios. {status, message, data}
 */
const bulkInsertPortfolio = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdPortfolio = await dbService.createMany(Portfolio,dataToCreate); 
      return  res.success({ data :{ count :createdPortfolio.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Portfolio from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Portfolio(s). {status, message, data}
 */
const findAllPortfolio = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundPortfolio;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      portfolioSchemaKey.findFilterKeys,
      Portfolio.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundPortfolio = await dbService.count(Portfolio, query);
      if (!foundPortfolio) {
        return res.recordNotFound();
      } 
      foundPortfolio = { totalRecords: foundPortfolio };
      return res.success({ data :foundPortfolio });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundPortfolio = await dbService.paginate( Portfolio,query,options);
    if (!foundPortfolio){
      return res.recordNotFound();
    }
    return res.success({ data:foundPortfolio }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Portfolio from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Portfolio. {status, message, data}
 */
const getPortfolio = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundPortfolio = await dbService.findOne(Portfolio,{ id :id });
    if (!foundPortfolio){
      return res.recordNotFound();
    }
    return  res.success({ data :foundPortfolio });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Portfolio.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getPortfolioCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      portfolioSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedPortfolio = await dbService.count(Portfolio,where);
    if (!countedPortfolio){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedPortfolio } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Portfolio with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Portfolio.
 * @return {Object} : updated Portfolio. {status, message, data}
 */
const updatePortfolio = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    delete dataToUpdate.addedBy;
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      portfolioSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedPortfolio = await dbService.update(Portfolio,query,dataToUpdate);
    return  res.success({ data :updatedPortfolio }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Portfolio with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Portfolios.
 * @return {Object} : updated Portfolios. {status, message, data}
 */
const bulkUpdatePortfolio = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedPortfolio = await dbService.update(Portfolio,filter,dataToUpdate);
    if (!updatedPortfolio){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedPortfolio.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Portfolio with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Portfolio.
 * @return {Object} : updated Portfolio. {status, message, data}
 */
const partialUpdatePortfolio = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      portfolioSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedPortfolio = await dbService.update(Portfolio, query, dataToUpdate);
    if (!updatedPortfolio) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedPortfolio });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Portfolio from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Portfolio.
 * @return {Object} : deactivated Portfolio. {status, message, data}
 */
const softDeletePortfolio = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Portfolio, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Portfolio from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Portfolio. {status, message, data}
 */
const deletePortfolio = async (req, res) => {
  const result = await dbService.deleteByPk(Portfolio, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Portfolio in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyPortfolio = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedPortfolio = await dbService.destroy(Portfolio,query);
    return res.success({ data :{ count :deletedPortfolio.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Portfolio from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Portfolio.
 * @return {Object} : number of deactivated documents of Portfolio. {status, message, data}
 */
const softDeleteManyPortfolio = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    const options = {};
    let updatedPortfolio = await dbService.update(Portfolio,query,updateBody, options);
    if (!updatedPortfolio) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedPortfolio.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addPortfolio,
  bulkInsertPortfolio,
  findAllPortfolio,
  getPortfolio,
  getPortfolioCount,
  updatePortfolio,
  bulkUpdatePortfolio,
  partialUpdatePortfolio,
  softDeletePortfolio,
  deletePortfolio,
  deleteManyPortfolio,
  softDeleteManyPortfolio,
};
