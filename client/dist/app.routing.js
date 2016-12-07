"use strict";
var gym_1 = require('./gym/components/gym');
exports.rootRouterConfig = [
    /*
    {
        path: '',
        redirectTo: 'wol',
        pathMatch: 'full'
        
    },
    */
    {
        path: '',
        component: gym_1.GymCmp
    },
    {
        path: ':id',
        component: gym_1.GymCmp
    }
];
/*

*/ 
