/**
 * portfolioRoutes.js
 * @description :: CRUD API routes for portfolio
 */

const express = require('express');
const router = express.Router();
const portfolioController = require('../../controller/admin/portfolioController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/portfolio/create').post(auth(PLATFORM.ADMIN),checkRolePermission,portfolioController.addPortfolio);
router.route('/admin/portfolio/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,portfolioController.bulkInsertPortfolio);
router.route('/admin/portfolio/list').post(auth(PLATFORM.ADMIN),checkRolePermission,portfolioController.findAllPortfolio);
router.route('/admin/portfolio/count').post(auth(PLATFORM.ADMIN),checkRolePermission,portfolioController.getPortfolioCount);
router.route('/admin/portfolio/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,portfolioController.getPortfolio);
router.route('/admin/portfolio/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,portfolioController.updatePortfolio);    
router.route('/admin/portfolio/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,portfolioController.partialUpdatePortfolio);
router.route('/admin/portfolio/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,portfolioController.bulkUpdatePortfolio);
router.route('/admin/portfolio/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,portfolioController.softDeletePortfolio);
router.route('/admin/portfolio/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,portfolioController.softDeleteManyPortfolio);
router.route('/admin/portfolio/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,portfolioController.deletePortfolio);
router.route('/admin/portfolio/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,portfolioController.deleteManyPortfolio);

module.exports = router;
