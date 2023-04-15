/**
 * portfolioRoutes.js
 * @description :: CRUD API routes for portfolio
 */

const express = require('express');
const router = express.Router();
const portfolioController = require('../../../controller/device/v1/portfolioController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/portfolio/create').post(auth(PLATFORM.DEVICE),checkRolePermission,portfolioController.addPortfolio);
router.route('/device/api/v1/portfolio/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,portfolioController.bulkInsertPortfolio);
router.route('/device/api/v1/portfolio/list').post(auth(PLATFORM.DEVICE),checkRolePermission,portfolioController.findAllPortfolio);
router.route('/device/api/v1/portfolio/count').post(auth(PLATFORM.DEVICE),checkRolePermission,portfolioController.getPortfolioCount);
router.route('/device/api/v1/portfolio/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,portfolioController.getPortfolio);
router.route('/device/api/v1/portfolio/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,portfolioController.updatePortfolio);    
router.route('/device/api/v1/portfolio/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,portfolioController.partialUpdatePortfolio);
router.route('/device/api/v1/portfolio/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,portfolioController.bulkUpdatePortfolio);
router.route('/device/api/v1/portfolio/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,portfolioController.softDeletePortfolio);
router.route('/device/api/v1/portfolio/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,portfolioController.softDeleteManyPortfolio);
router.route('/device/api/v1/portfolio/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,portfolioController.deletePortfolio);
router.route('/device/api/v1/portfolio/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,portfolioController.deleteManyPortfolio);

module.exports = router;
