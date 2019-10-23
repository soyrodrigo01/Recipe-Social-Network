// Application configuration.
'use strict';

var config = module.exports;

config.db = {
    user: 'admin', 
    password: 'admin123',
    name: 'cookbook'
};

config.db.details = {
    host: 'rds-mysql-recipes.chgi9aqtb48j.us-east-2.rds.amazonaws.com',
    port: 3306,      
    dialect: 'mysql'
};

config.keys = {
    secret: 'dftkjgndfkKJBIUNBisrjh90eroiwq*(^*&UIHlkm' // Not anymore...
};

var userRoles = config.userRoles = {
    guest: 1,    // ...001
    user: 2,     // ...010
    admin: 4     // ...100
};

config.accessLevels = {
    guest: userRoles.guest | userRoles.user | userRoles.admin,    // ...111
    user: userRoles.user | userRoles.admin,                       // ...110
    admin: userRoles.admin                                        // ...100
};