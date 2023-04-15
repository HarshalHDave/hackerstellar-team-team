/**
 * investmentRoutes.js
 * @description :: CRUD API routes for investment
 */

const express = require('express');
const router = express.Router();
const investmentController = require('../../../controller/device/v1/investmentController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/investment/create').post(auth(PLATFORM.DEVICE),checkRolePermission,investmentController.addInvestment);
router.route('/device/api/v1/investment/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,investmentController.bulkInsertInvestment);
router.route('/device/api/v1/investment/list').post(auth(PLATFORM.DEVICE),checkRolePermission,investmentController.findAllInvestment);
router.route('/device/api/v1/investment/count').post(auth(PLATFORM.DEVICE),checkRolePermission,investmentController.getInvestmentCount);
router.route('/device/api/v1/investment/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,investmentController.getInvestment);
router.route('/device/api/v1/investment/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,investmentController.updateInvestment);    
router.route('/device/api/v1/investment/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,investmentController.partialUpdateInvestment);
router.route('/device/api/v1/investment/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,investmentController.bulkUpdateInvestment);
router.route('/device/api/v1/investment/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,investmentController.softDeleteInvestment);
router.route('/device/api/v1/investment/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,investmentController.softDeleteManyInvestment);
router.route('/device/api/v1/investment/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,investmentController.deleteInvestment);
router.route('/device/api/v1/investment/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,investmentController.deleteManyInvestment);

module.exports = router;
