exports.config = {
    runner: "local",
    specs: ["../tests/**/*.spec.js"],
    maxInstances: 2,
    capabilities: [{
        browserName: "chrome"
    }],
    logLevel: "info",
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: "mocha",
    reporters: ["spec"],
    mochaOpts: {
        ui: "bdd",
        timeout: 60000
    }
};
