import { Component, Injectable } from '@angular/core/core';
import { Route, Routes } from '@angular/router/router';
import { Observable } from 'rxjs/Rx';

export class RouteOutlets<T> {

    path: string;
    layout: T;
    private routes: Routes;
    private _route: Route = {
        path: '',
        children: []
    };
    get route() {
        return this._route;
    }
    set route(value) {
        this._route = value;
    }

    constructor(layout: T, routes: Routes = [], path = '') {
        this.route.path = path;
        this.route.component = <any>layout;
        this.route.children = routes;

        this.layout = layout;
        // this.routes = routes;
        // this.path = path;
    }


    add_outlet(route: Route): this {
        route.path = '';
        this.route.children.push(route);
        return this;
    }

    new_route(path: string): RouteOutlets<T> {
        return new RouteOutlets(this.layout, this.routes.concat([]), path);
    }

    add_child(route: Route) {
        this.route.children.push(route);
        return this;
    }

    get_route(): Route {
        return {
            path: this.path,
            component: <any>this.layout,
            children: this.routes
        }
    }

}


// export class OutletModule {

//     route: Route;

//     constructor(route: Route) {
//         this.route = route;
//     }

//     add_child_route(route: Route): this {
//         this.route.children.push(route);
//         debugger
//         return this;
//     }

//     get_routes(): Route {
//         return this.route;
//     }

// }

// export interface TemplatedRoute {
//     path: string;
//     component: any;
// }

// export function route<T extends { new (...args: any[]): {} }>(childs: OutletTemplatesModule): any {
//     debugger
//     return (constructor: T) => {
//         debugger
//         var origin = constructor;
//         return class extends constructor {
//             children = childs.routes;
//         }
//     }
// }