var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var LoginService = (function () {
    function LoginService() {
    }
    LoginService.prototype.login = function (username, password) {
        if (username == '' || password == '') {
            return 'نام کاربری و کلمه عبور را وارد نمایید';
        }
        else {
            return 'ورود شما با موفقیت انجام شد';
        }
    };
    return LoginService;
}());
LoginService = __decorate([
    Injectable()
], LoginService);
export { LoginService };
//# sourceMappingURL=login.service.js.map