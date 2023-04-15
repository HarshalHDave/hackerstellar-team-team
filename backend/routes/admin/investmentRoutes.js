/**
 * investmentRoutes.js
 * @description :: CRUD API routes for investment
 */

const express = require('express');
const router = express.Router();
const investmentController = require('../../controller/admin/investmentController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/investment/create').post(auth(PLATFORM.ADMIN),checkRolePermission,investmentController.addInvestment);
router.route('/admin/investment/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,investmentController.bulkInsertInvestment);
router.route('/admin/investment/list').post(auth(PLATFORM.ADMIN),checkRolePermission,investmentController.findAllInvestment);
router.route('/admin/investment/count').post(auth(PLATFORM.ADMIN),checkRolePermission,investmentController.getInvestmentCount);
router.route('/admin/investment/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,investmentController.getInvestment);
router.route('/admin/investment/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,investmentController.updateInvestment);    
router.route('/admin/investment/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,investmentController.partialUpdateInvestment);
router.route('/admin/investment/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,investmentController.bulkUpdateInvestment);
router.route('/admin/investment/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,investmentController.softDeleteInvestment);
router.route('/admin/investment/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,investmentController.softDeleteManyInvestment);
router.route('/admin/investment/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,investmentController.deleteInvestment);
router.route('/admin/investment/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,investmentController.deleteManyInvestment);

module.exports = router;
