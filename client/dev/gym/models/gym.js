"use strict";
var MyModel = (function () {
    function MyModel() {
    }
    MyModel.prototype.doStuff = function () {
        return 1;
    };
    return MyModel;
}());
exports.MyModel = MyModel;
