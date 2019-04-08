package com.ford.analytics.analytics.applications.analytics

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.junit.runners.JUnit4
import java.util.*

@RunWith(JUnit4::class)
class AnalyticsServiceTest {
    @Test
    fun `zero hits are returned by default`() {
        val subject = AnalyticsService()
        val appId = UUID.randomUUID()

        assertThat(subject.getHitsCount(appId).count).isEqualTo(0)
    }

    @Test
    fun `hits are registered`() {
        val subject = AnalyticsService()
        val appId = UUID.randomUUID()

        subject.registerHit(appId)

        assertThat(subject.getHitsCount(appId).count).isEqualTo(1)
    }
}