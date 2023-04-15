/**
 * investmentController.js
 * @description :: exports action methods for investment.
 */

const Investment = require('../../../model/investment');
const investmentSchemaKey = require('../../../utils/validation/investmentValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Investment in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Investment. {status, message, data}
 */ 
const addInvestment = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      investmentSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdInvestment = await dbService.createOne(Investment,dataToCreate);
    return  res.success({ data :createdInvestment });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Investment in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Investments. {status, message, data}
 */
const bulkInsertInvestment = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdInvestment = await dbService.createMany(Investment,dataToCreate); 
      return  res.success({ data :{ count :createdInvestment.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Investment from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Investment(s). {status, message, data}
 */
const findAllInvestment = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundInvestment;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      investmentSchemaKey.findFilterKeys,
      Investment.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundInvestment = await dbService.count(Investment, query);
      if (!foundInvestment) {
        return res.recordNotFound();
      } 
      foundInvestment = { totalRecords: foundInvestment };
      return res.success({ data :foundInvestment });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundInvestment = await dbService.paginate( Investment,query,options);
    if (!foundInvestment){
      return res.recordNotFound();
    }
    return res.success({ data:foundInvestment }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Investment from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Investment. {status, message, data}
 */
const getInvestment = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundInvestment = await dbService.findOne(Investment,{ id :id });
    if (!foundInvestment){
      return res.recordNotFound();
    }
    return  res.success({ data :foundInvestment });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Investment.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getInvestmentCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      investmentSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedInvestment = await dbService.count(Investment,where);
    if (!countedInvestment){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedInvestment } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Investment with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Investment.
 * @return {Object} : updated Investment. {status, message, data}
 */
const updateInvestment = async (req, res) => {
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
      investmentSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedInvestment = await dbService.update(Investment,query,dataToUpdate);
    return  res.success({ data :updatedInvestment }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Investment with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Investments.
 * @return {Object} : updated Investments. {status, message, data}
 */
const bulkUpdateInvestment = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedInvestment = await dbService.update(Investment,filter,dataToUpdate);
    if (!updatedInvestment){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedInvestment.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Investment with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Investment.
 * @return {Object} : updated Investment. {status, message, data}
 */
const partialUpdateInvestment = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      investmentSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedInvestment = await dbService.update(Investment, query, dataToUpdate);
    if (!updatedInvestment) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedInvestment });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Investment from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Investment.
 * @return {Object} : deactivated Investment. {status, message, data}
 */
const softDeleteInvestment = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Investment, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Investment from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Investment. {status, message, data}
 */
const deleteInvestment = async (req, res) => {
  const result = await dbService.deleteByPk(Investment, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Investment in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyInvestment = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedInvestment = await dbService.destroy(Investment,query);
    return res.success({ data :{ count :deletedInvestment.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Investment from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Investment.
 * @return {Object} : number of deactivated documents of Investment. {status, message, data}
 */
const softDeleteManyInvestment = async (req, res) => {
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
    let updatedInvestment = await dbService.update(Investment,query,updateBody, options);
    if (!updatedInvestment) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedInvestment.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addInvestment,
  bulkInsertInvestment,
  findAllInvestment,
  getInvestment,
  getInvestmentCount,
  updateInvestment,
  bulkUpdateInvestment,
  partialUpdateInvestment,
  softDeleteInvestment,
  deleteInvestment,
  deleteManyInvestment,
  softDeleteManyInvestment,
};
