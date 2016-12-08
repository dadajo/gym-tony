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
var router_1 = require('@angular/router');
var gym_1 = require('../services/gym');
var GymCmp = (function () {
    function GymCmp(route, _gymService) {
        this.route = route;
        this._gymService = _gymService;
        this.user = [];
    }
    GymCmp.prototype.add = function () {
        if (this.gymId) {
            this._gymService
                .add({ "user": this.user, "id": this.gymId })
                .subscribe(function (resp) {
                console.log(resp);
            });
        }
    };
    GymCmp.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params
            .map(function (params) { return params['id']; })
            .subscribe(function (id) {
            if (id)
                _this.gymId = id; //console.log('gym/:id =>  '+id);
            else
                console.log('gym =>  sin id');
        });
    };
    GymCmp.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    GymCmp = __decorate([
        core_1.Component({
            selector: 'gym',
            templateUrl: 'gym/templates/gym.html',
            styleUrls: ['gym/styles/gym.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, gym_1.GymService])
    ], GymCmp);
    return GymCmp;
}());
exports.GymCmp = GymCmp;
