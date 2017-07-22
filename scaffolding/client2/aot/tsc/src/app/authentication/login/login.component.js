var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { LoginService } from '../login.service';
var LoginComponent = (function () {
    function LoginComponent(loginService) {
        this.loginService = loginService;
        this.title = 'گروه شرکت های شاتل';
        this.response = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        //this.getHeroes();
    };
    //onSelect(hero: Hero): Hero {
    //    this.selectedHero = hero;
    //    return this.selectedHero;
    //}
    LoginComponent.prototype.login = function (username, password) {
        return this.loginService.login(username, password);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    }),
    __metadata("design:paramtypes", [LoginService])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map