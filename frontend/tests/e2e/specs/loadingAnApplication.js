const http = require('http')

module.exports = {
    'applications can be created': browser => {
        browser
            .url(process.env.VUE_DEV_SERVER_URL)

            .waitForElementVisible('#app', 5000)

            .setValue('[data-qa=new-app-name-input]', 'Test App')
            .waitForElementVisible('[data-qa=create-app-submit-button]', 1000)
            .click('[data-qa=create-app-submit-button]')

            .pause(1000)

            .assert.containsText('[data-qa=app-name]', 'Test App')
    },
    'existing applications can be loaded': browser => {
        browser
            .url(process.env.VUE_DEV_SERVER_URL)

            .assert.elementPresent('[data-qa=existing-app]')
            .click('[data-qa=existing-app] a')

            .pause(1000)

            .assert.containsText('[data-qa=app-name]', 'Test App')
    },
    'there are no hits immediately after creating the app': browser => {
        browser.assert.containsText('[data-qa=hits-count]', '0')
    },
    'analytics can be collected on a tracked page': browser => {
        browser.getText('[data-qa=client-script]', (result) => {
            const server = http.createServer((request, response) => {
                response.write(`<!DOCTYPE html><html><head><title>e2e</title></head><body><div data-qa="analytics-sample"></div>${result.value}</body></html>`)
                response.end()
                server.close()
            })

            server.listen(8082)
        })

        browser.url('http://localhost:8082')
        browser.waitForElementPresent('[data-qa=analytics-sample]', 5000)
    },
    'the hits count is updated after the tracked page is visited': browser => {
        browser
            .url(process.env.VUE_DEV_SERVER_URL)

            .waitForElementVisible('#app', 5000)

            .click('[data-qa=existing-app] a')

            .pause(1000)

        browser.assert.containsText('[data-qa=hits-count]', '1')

        browser.end()
    }
}
