const {defineConfig} = require("cypress");

module.exports = defineConfig({
    viewportWidth: 1280,
    viewportHeight: 720,
    e2e: {
        baseUrl: "https://www.lhv.ee",
        reporter: 'mochawesome',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
