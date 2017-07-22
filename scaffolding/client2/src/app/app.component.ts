// #docplaster
// #docregion
import { Observable } from 'rxjs/observable';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';


export interface AppState {
        counter: number;
        acounter: number;
}

@Component({
        selector: 'my-app',
        templateUrl: "./app.component.html",
        styleUrls: ['./app.component.css']
})
export class AppComponent {
        title = 'SSO';
        routes: Object[] = [{
                icon: 'wifi',
                route: 'dashboard',
                title: 'dashboard'
        }, {
                icon: 'shopping_cart',
                route: 'layout/cardover',
                title: 'layout/cardover'
        }, {
                icon: 'call',
                route: 'login',
                title: 'login'
        }, {
                icon: 'equalizer',
                route: '#',
                title: 'گزارش مصرف روزانه اینترنت'
        }, {
                icon: 'settings_phone',
                route: '#',
                title: 'صدای مشتری'
        },
        ];

        counter: Observable<number>;
        acounter: Observable<number>;

        constructor(private store: Store<AppState>) {
                this.counter = store.select(s=>s.counter);
                this.acounter = store.select(s=>s.acounter);
        }

}




        //constructor(private _iconRegistry: MdIconRegistry,
        //        private _domSanitizer: DomSanitizer,
        //        translateService: TranslateService) {
        //        // Set fallback language
        //        translateService.setDefaultLang('en');
        //        // Supported languages
        //        translateService.addLangs(['en', 'es']);

        //        // Get selected language and load it
        //        translateService.use(getSelectedLanguage(translateService));

        //        // Register svgs
        //        this._iconRegistry.addSvgIconInNamespace('assets', 'myshatel',
        //                this._domSanitizer.bypassSecurityTrustResourceUrl('app/assets/images/logo.png'));
        //}
// }
