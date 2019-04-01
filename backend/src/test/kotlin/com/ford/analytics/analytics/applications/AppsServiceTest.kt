package com.ford.analytics.analytics.applications

import com.ford.analytics.analytics.applications.data.CreateAppRequest
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.junit.runners.JUnit4

@RunWith(JUnit4::class)
class AppsServiceTest {
    @Test
    fun `saves new application`() {
        val subject = AppsService()

        val createAppRequest = CreateAppRequest("hello world")
        val createdApp = subject.saveApp(createAppRequest)

        assertThat(createdApp).isNotNull
    }

    @Test
    fun `a created app can be retrieved`() {
        val subject = AppsService()

        val createAppRequest = CreateAppRequest("hello world")
        val createdApp = subject.saveApp(createAppRequest)
        val retrievedApp = subject.loadApp(createdApp.id)

        assertThat(retrievedApp).isSameAs(createdApp)
    }
}