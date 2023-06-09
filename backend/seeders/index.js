/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */
const model = require('../model');
const dbService = require('../utils/dbService');
const bcrypt = require('bcrypt');
const authConstant = require('../constants/authConstant');
const { replaceAll } = require('../utils/common');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = await dbService.findOne(model.user,{ 'email':'adi@gmail.com' });
    if (!userToBeInserted) {  
      userToBeInserted = {
        'password':'adi123',
        'isDeleted':false,
        'email':'adi@gmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.User
      };
      await dbService.createOne(model.user,userToBeInserted);
    } else {
      userToBeInserted = {
        'password':'adi123',
        'isDeleted':false,
        'email':'adi@gmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.User
      };
      userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
      await dbService.update(model.user, { 'email':'adi@gmail.com' }, userToBeInserted);
    }
    userToBeInserted = await dbService.findOne(model.user,{ 'email':'barfi@gmail.com' });
    if (!userToBeInserted) {  
      userToBeInserted = {
        'password':'barfi123',
        'isDeleted':false,
        'email':'barfi@gmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.Admin
      };
      await dbService.createOne(model.user,userToBeInserted);
    } else {
      userToBeInserted = {
        'password':'barfi123',
        'isDeleted':false,
        'email':'barfi@gmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.Admin
      };
      userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
      await dbService.update(model.user, { 'email':'barfi@gmail.com' }, userToBeInserted);
    }
    console.info('User model seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
  
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'User', 'Admin', 'System_User' ];
    const insertedRoles = await dbService.findAll(model.role, { code: { $in: roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.createMany(model.role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes) {
      let routeName = '';
      const dbRoutes = await dbService.findAll(model.projectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.createMany(model.projectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/admin/investment/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/investment/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/investment/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/investment/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/investment/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/investment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/investment/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/investment/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/investment/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/investment/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/investment/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/investment/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/investment/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/investment/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/investment/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/investment/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/investment/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/investment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/investment/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/investment/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/investment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/investment/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/investment/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/investment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/investment/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/investment/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/investment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/investment/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/investment/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/investment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/investment/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/investment/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/investment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/investment/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/investment/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/investment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/open_order/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/open_order/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/open_order/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/open_order/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/open_order/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/open_order/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/open_order/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/open_order/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/open_order/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/open_order/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/open_order/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/open_order/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/open_order/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/open_order/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/open_order/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/open_order/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/open_order/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/open_order/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/open_order/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/open_order/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/open_order/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/open_order/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/open_order/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/open_order/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/open_order/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/open_order/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/open_order/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/open_order/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/open_order/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/open_order/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/open_order/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/open_order/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/open_order/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/open_order/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/open_order/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/open_order/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/portfolio/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/portfolio/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/portfolio/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/portfolio/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/portfolio/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/portfolio/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/portfolio/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/portfolio/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/portfolio/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/portfolio/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/portfolio/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/portfolio/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/portfolio/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/portfolio/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/portfolio/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/portfolio/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/portfolio/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/portfolio/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/portfolio/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/portfolio/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/portfolio/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/portfolio/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/portfolio/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/portfolio/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/portfolio/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/portfolio/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/portfolio/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/portfolio/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/portfolio/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/portfolio/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/portfolio/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/portfolio/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/portfolio/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/portfolio/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/portfolio/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/portfolio/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/investment/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/investment/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/investment/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/investment/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/investment/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/investment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/investment/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/investment/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/investment/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/investment/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/investment/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/investment/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/investment/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/investment/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/investment/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/investment/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/investment/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/investment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/investment/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/investment/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/investment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/investment/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/investment/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/investment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/investment/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/investment/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/investment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/investment/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/investment/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/investment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/investment/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/investment/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/investment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/investment/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/investment/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/investment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/open_order/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/open_order/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/open_order/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/open_order/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/open_order/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/open_order/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/open_order/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/open_order/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/open_order/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/open_order/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/open_order/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/open_order/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/open_order/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/open_order/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/open_order/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/open_order/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/open_order/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/open_order/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/open_order/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/open_order/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/open_order/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/open_order/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/open_order/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/open_order/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/open_order/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/open_order/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/open_order/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/open_order/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/open_order/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/open_order/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/open_order/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/open_order/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/open_order/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/open_order/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/open_order/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/open_order/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portfolio/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portfolio/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portfolio/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portfolio/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portfolio/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portfolio/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portfolio/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portfolio/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portfolio/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portfolio/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/portfolio/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/portfolio/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/portfolio/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portfolio/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portfolio/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portfolio/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portfolio/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portfolio/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portfolio/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portfolio/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portfolio/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portfolio/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portfolio/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portfolio/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portfolio/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portfolio/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portfolio/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portfolio/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portfolio/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portfolio/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portfolio/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/portfolio/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/portfolio/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/portfolio/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portfolio/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portfolio/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'User', 'Admin', 'System_User' ];
      const insertedProjectRoute = await dbService.findAll(model.projectRoute, {
        uri: { $in: routes },
        method: { $in: routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findAll(model.role, {
        code: { $in: roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};
    
      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(model.routeRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.createMany(model.routeRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [{
      'email':'adi@gmail.com',
      'password':'adi123'
    },{
      'email':'barfi@gmail.com',
      'password':'barfi123'
    }];
    const defaultRoles = await dbService.findAll(model.role);
    const insertedUsers = await dbService.findAll(model.user, { username: { $in: userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Admin){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'ADMIN').id
          });
        } else if (user.userType === authConstant.USER_TYPES.User){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'USER').id
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'SYSTEM_USER').id
          });
        }  
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(model.userRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.createMany(model.userRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('UserRole seeder failed due to ', error.message);
  }
}

/* calls of functions to seed mock data into multiple collections */
async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();
};
module.exports = seedData;