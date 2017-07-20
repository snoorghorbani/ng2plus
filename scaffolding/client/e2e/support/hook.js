import { browser } from 'protractor';
import * as fs from 'fs';
import { binding, before, after } from "cucumber-tsflow";
/*
Hooks help us follow DRY principle, all the utility functions go here
BeforeScenario, Features and screenshot hooks example provided here
**/

@binding()
class Hook {

        @before()
        public async BeforeFeature(event): Promise<any> {
                return browser.get('/ng1/calculator');
        };

        @after()
        public async After(scenario, done): Promise<void> {
                if (scenario.isFailed()) {
                        return browser.takeScreenshot().then(function (base64png) {
                                let decodedImage = new Buffer(base64png, 'base64').toString('binary');
                                scenario.attach(decodedImage, 'image/png');
                        }, (err) => {
                                done(err);
                        });
                } else {
                        done();
                }
        };
}

export = Hook