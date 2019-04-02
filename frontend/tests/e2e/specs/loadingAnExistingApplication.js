module.exports = {
    'user can load an existing application': browser => {
        browser
            .url(process.env.VUE_DEV_SERVER_URL)
            .waitForElementVisible('#app', 5000)
            .setValue('[data-qa=new-app-name-input]', 'Test App')
            .waitForElementVisible('[data-qa=create-app-submit-button]', 1000)
            .click('[data-qa=create-app-submit-button]')
            .pause(1000)

        browser
            .url(process.env.VUE_DEV_SERVER_URL)
            .assert.elementPresent('[data-qa=existing-app]')
            .click('[data-qa=existing-app] a')
            .pause(1000)
            .assert.containsText('[data-qa=app-name]', 'Test App')

        browser
            .end()
    }
}
