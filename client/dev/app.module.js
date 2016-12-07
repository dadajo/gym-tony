"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require("@angular/router");
var common_1 = require('@angular/common');
//import {APP_BASE_HREF} from '@angular/common';
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var ng2_validation_1 = require('ng2-validation');
var platform_browser_1 = require('@angular/platform-browser');
var app_routing_1 = require('./app.routing');
var app_component_1 = require('./app.component');
var todo_cmp_1 = require('./todo/components/todo-cmp');
var todo_service_1 = require('./todo/services/todo-service');
var gym_1 = require('./gym/components/gym');
var gym_2 = require('./gym/services/gym');
//enableProdMode();
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                ng2_validation_1.CustomFormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot(app_routing_1.rootRouterConfig)
            ],
            declarations: [
                app_component_1.AppComponent,
                gym_1.GymCmp,
                todo_cmp_1.TodoCmp
            ],
            providers: [
                gym_2.GymService,
                todo_service_1.TodoService,
                //{provide: APP_BASE_HREF, useValue: ''}//PathLocationStrategy 
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy } //HashLocationStrategy
            ],
            bootstrap: [
                app_component_1.AppComponent
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
