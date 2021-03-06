/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
/* tslint:disable */
import * as import0 from './dashboard.component.css.shim.ngstyle';
import * as import1 from '@angular/core';
import * as import2 from '@angular/flex-layout/flexbox/api/class';
import * as import3 from '@angular/flex-layout/media-query/media-monitor';
import * as import4 from '@angular/router';
import * as import5 from '@angular/common';
import * as import6 from './hero-search.component.ngfactory';
import * as import7 from '../../../src/app/hero-search.service';
import * as import8 from '@angular/http';
import * as import9 from '../../../src/app/hero-search.component';
import * as import10 from '../../../src/app/dashboard.component';
import * as import11 from '../../../src/app/hero.service';
var styles_DashboardComponent = [import0.styles];
export var RenderType_DashboardComponent = import1.ɵcrt({
    encapsulation: 0,
    styles: styles_DashboardComponent,
    data: {}
});
function View_DashboardComponent_1(l) {
    return import1.ɵvid(0, [
        (l()(), import1.ɵeld(0, null, null, 11, 'a', [[
                'class',
                'col-1-4'
            ]
        ], [
            [
                1,
                'target',
                0
            ],
            [
                8,
                'href',
                4
            ]
        ], [[
                null,
                'click'
            ]
        ], function (v, en, $event) {
            var ad = true;
            if (('click' === en)) {
                var pd_0 = (import1.ɵnov(v, 2).onClick($event.button, $event.ctrlKey, $event.metaKey) !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        import1.ɵdid(466944, null, 0, import2.ClassDirective, [
            import3.MediaMonitor,
            import1.IterableDiffers,
            import1.KeyValueDiffers,
            import1.ElementRef,
            import1.Renderer
        ], { classBase: [
                0,
                'classBase'
            ]
        }, null),
        import1.ɵdid(335872, null, 0, import4.RouterLinkWithHref, [
            import4.Router,
            import4.ActivatedRoute,
            import5.LocationStrategy
        ], { routerLink: [
                0,
                'routerLink'
            ]
        }, null),
        import1.ɵpad(2),
        (l()(), import1.ɵted(null, ['\n    '])),
        (l()(), import1.ɵeld(0, null, null, 5, 'div', [[
                'class',
                'module hero'
            ]
        ], null, null, null, null, null)),
        import1.ɵdid(466944, null, 0, import2.ClassDirective, [
            import3.MediaMonitor,
            import1.IterableDiffers,
            import1.KeyValueDiffers,
            import1.ElementRef,
            import1.Renderer
        ], { classBase: [
                0,
                'classBase'
            ]
        }, null),
        (l()(), import1.ɵted(null, ['\n      '])),
        (l()(), import1.ɵeld(0, null, null, 1, 'h4', [], null, null, null, null, null)),
        (l()(), import1.ɵted(null, [
            '',
            ''
        ])),
        (l()(), import1.ɵted(null, ['\n    '])),
        (l()(), import1.ɵted(null, ['\n  ']))
    ], function (ck, v) {
        var currVal_2 = 'col-1-4';
        ck(v, 1, 0, currVal_2);
        var currVal_3 = ck(v, 3, 0, '/detail', v.context.$implicit.id);
        ck(v, 2, 0, currVal_3);
        var currVal_4 = 'module hero';
        ck(v, 6, 0, currVal_4);
    }, function (ck, v) {
        var currVal_0 = import1.ɵnov(v, 2).target;
        var currVal_1 = import1.ɵnov(v, 2).href;
        ck(v, 0, 0, currVal_0, currVal_1);
        var currVal_5 = v.context.$implicit.name;
        ck(v, 9, 0, currVal_5);
    });
}
export function View_DashboardComponent_0(l) {
    return import1.ɵvid(0, [
        (l()(), import1.ɵted(null, ['\n'])),
        (l()(), import1.ɵeld(0, null, null, 1, 'h3', [], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['Top Heroes'])),
        (l()(), import1.ɵted(null, ['\n'])),
        (l()(), import1.ɵeld(0, null, null, 5, 'div', [[
                'class',
                'grid grid-pad'
            ]
        ], null, null, null, null, null)),
        import1.ɵdid(466944, null, 0, import2.ClassDirective, [
            import3.MediaMonitor,
            import1.IterableDiffers,
            import1.KeyValueDiffers,
            import1.ElementRef,
            import1.Renderer
        ], { classBase: [
                0,
                'classBase'
            ]
        }, null),
        (l()(), import1.ɵted(null, ['\n  '])),
        (l()(), import1.ɵand(8388608, null, null, 1, null, View_DashboardComponent_1)),
        import1.ɵdid(401408, null, 0, import5.NgForOf, [
            import1.ViewContainerRef,
            import1.TemplateRef,
            import1.IterableDiffers
        ], { ngForOf: [
                0,
                'ngForOf'
            ]
        }, null),
        (l()(), import1.ɵted(null, ['\n'])),
        (l()(), import1.ɵted(null, ['\n'])),
        (l()(), import1.ɵeld(0, null, null, 2, 'hero-search', [], null, null, null, import6.View_HeroSearchComponent_0, import6.RenderType_HeroSearchComponent)),
        import1.ɵprd(256, null, import7.HeroSearchService, import7.HeroSearchService, [import8.Http]),
        import1.ɵdid(57344, null, 0, import9.HeroSearchComponent, [
            import7.HeroSearchService,
            import4.Router
        ], null, null),
        (l()(), import1.ɵted(null, ['\n']))
    ], function (ck, v) {
        var co = v.component;
        var currVal_0 = 'grid grid-pad';
        ck(v, 5, 0, currVal_0);
        var currVal_1 = co.heroes;
        ck(v, 8, 0, currVal_1);
        ck(v, 13, 0);
    }, null);
}
function View_DashboardComponent_Host_0(l) {
    return import1.ɵvid(0, [
        (l()(), import1.ɵeld(0, null, null, 1, 'my-dashboard', [], null, null, null, View_DashboardComponent_0, RenderType_DashboardComponent)),
        import1.ɵdid(57344, null, 0, import10.DashboardComponent, [import11.HeroService], null, null)
    ], function (ck, v) {
        ck(v, 1, 0);
    }, null);
}
export var DashboardComponentNgFactory = import1.ɵccf('my-dashboard', import10.DashboardComponent, View_DashboardComponent_Host_0, {}, {}, []);
//# sourceMappingURL=dashboard.component.ngfactory.js.map