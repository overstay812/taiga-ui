module.exports = function (config, path = '') {
    config.set({
        basePath: '',
        frameworks: ['jasmine-ajax', 'jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-jasmine-ajax'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
        ],
        client: {
            clearContext: false,
        },
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, './coverage', path),
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true,
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: true,
        customLaunchers: {
            /**
             * @description:
             * browsers: ['ChromeNoHeadless']
             * use for visual debugging
             */
            ChromeNoHeadless: {
                base: 'Chrome',
                flags: ['--disable-web-security', '--remote-debugging-port=9222'],
            },
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--no-sandbox',
                    '--headless',
                    '--disable-gpu',
                    '--disable-web-security',
                    '--remote-debugging-port=9222',
                ],
            },
        },
    });
};
