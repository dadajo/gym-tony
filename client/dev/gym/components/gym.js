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
var GymCmp = (function () {
    function GymCmp(route) {
        this.route = route;
    }
    GymCmp.prototype.ngOnInit = function () {
        // Obtenemos el id del curso pasado por la url
        /*
        this.route.params.subscribe(
            params => {
                
                this.id = +params['id'];

                console.log(this.id);
            }
        )
        */
        this.sub = this.route.params
            .map(function (params) { return params['id']; })
            .subscribe(function (id) {
            if (id)
                console.log('gym/:id =>  ' + id);
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
        __metadata('design:paramtypes', [router_1.ActivatedRoute])
    ], GymCmp);
    return GymCmp;
}());
exports.GymCmp = GymCmp;
