/**
 * open_orderController.js
 * @description :: exports action methods for open_order.
 */

const Open_order = require('../../model/open_order');
const open_orderSchemaKey = require('../../utils/validation/open_orderValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Open_order in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Open_order. {status, message, data}
 */ 
const addOpen_order = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      open_orderSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdOpen_order = await dbService.createOne(Open_order,dataToCreate);
    return  res.success({ data :createdOpen_order });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Open_order in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Open_orders. {status, message, data}
 */
const bulkInsertOpen_order = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdOpen_order = await dbService.createMany(Open_order,dataToCreate); 
      return  res.success({ data :{ count :createdOpen_order.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Open_order from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Open_order(s). {status, message, data}
 */
const findAllOpen_order = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundOpen_order;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      open_orderSchemaKey.findFilterKeys,
      Open_order.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundOpen_order = await dbService.count(Open_order, query);
      if (!foundOpen_order) {
        return res.recordNotFound();
      } 
      foundOpen_order = { totalRecords: foundOpen_order };
      return res.success({ data :foundOpen_order });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundOpen_order = await dbService.paginate( Open_order,query,options);
    if (!foundOpen_order){
      return res.recordNotFound();
    }
    return res.success({ data:foundOpen_order }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Open_order from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Open_order. {status, message, data}
 */
const getOpen_order = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundOpen_order = await dbService.findOne(Open_order,{ id :id });
    if (!foundOpen_order){
      return res.recordNotFound();
    }
    return  res.success({ data :foundOpen_order });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Open_order.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getOpen_orderCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      open_orderSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedOpen_order = await dbService.count(Open_order,where);
    if (!countedOpen_order){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedOpen_order } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Open_order with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Open_order.
 * @return {Object} : updated Open_order. {status, message, data}
 */
const updateOpen_order = async (req, res) => {
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
      open_orderSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedOpen_order = await dbService.update(Open_order,query,dataToUpdate);
    return  res.success({ data :updatedOpen_order }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Open_order with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Open_orders.
 * @return {Object} : updated Open_orders. {status, message, data}
 */
const bulkUpdateOpen_order = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedOpen_order = await dbService.update(Open_order,filter,dataToUpdate);
    if (!updatedOpen_order){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedOpen_order.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Open_order with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Open_order.
 * @return {Object} : updated Open_order. {status, message, data}
 */
const partialUpdateOpen_order = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      open_orderSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedOpen_order = await dbService.update(Open_order, query, dataToUpdate);
    if (!updatedOpen_order) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedOpen_order });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Open_order from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Open_order.
 * @return {Object} : deactivated Open_order. {status, message, data}
 */
const softDeleteOpen_order = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Open_order, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Open_order from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Open_order. {status, message, data}
 */
const deleteOpen_order = async (req, res) => {
  const result = await dbService.deleteByPk(Open_order, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Open_order in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyOpen_order = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedOpen_order = await dbService.destroy(Open_order,query);
    return res.success({ data :{ count :deletedOpen_order.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Open_order from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Open_order.
 * @return {Object} : number of deactivated documents of Open_order. {status, message, data}
 */
const softDeleteManyOpen_order = async (req, res) => {
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
    let updatedOpen_order = await dbService.update(Open_order,query,updateBody, options);
    if (!updatedOpen_order) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedOpen_order.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addOpen_order,
  bulkInsertOpen_order,
  findAllOpen_order,
  getOpen_order,
  getOpen_orderCount,
  updateOpen_order,
  bulkUpdateOpen_order,
  partialUpdateOpen_order,
  softDeleteOpen_order,
  deleteOpen_order,
  deleteManyOpen_order,
  softDeleteManyOpen_order,
};
