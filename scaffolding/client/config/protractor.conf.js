
exports.config = {
  allScriptsTimeout: 180000,
  getPageTimeout :300000,
  specs: ['../features/**/*.feature'],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },
  plugins: [],
  baseUrl: 'http://localhost:4444/',
  directConnect: true,
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    //compiler: "ts:ts-node/register",
    format: "pretty",
    require: [
      '../src/app/**/*.steps.js'
    ]
  },
  onPrepare: function () {
    const globals = require('protractor');
    const browser = globals.browser;
    browser.manage().window().maximize();
  }
};
