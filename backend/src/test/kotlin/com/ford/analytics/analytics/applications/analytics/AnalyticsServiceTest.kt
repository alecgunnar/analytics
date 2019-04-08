package com.ford.analytics.analytics.applications.analytics

import com.ford.analytics.analytics.AppsRepository
import com.ford.analytics.analytics.data.AppEntity
import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.junit.runners.JUnit4
import org.mockito.ArgumentMatchers
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.junit.MockitoJUnitRunner
import java.util.*

@RunWith(MockitoJUnitRunner::class)
class AnalyticsServiceTest {
    @Mock
    lateinit var appsRepository: AppsRepository

    lateinit var subject: AnalyticsService

    lateinit var appId: UUID

    @Before
    fun setup() {
        subject = AnalyticsService(appsRepository)
        appId = UUID.randomUUID()

        `when`(appsRepository.findById(any<UUID>())).thenReturn(
                Optional.of(
                        AppEntity(
                                appId, "Sample", 10
                        )
                )
        )
    }

    @Test
    fun `number of hits is returned`() {
        assertThat(subject.getHitsCount(appId).count).isEqualTo(10)

        verify(appsRepository).findById(appId)
    }

    @Test
    fun `hits are registered`() {
        subject.registerHit(appId)

        verify(appsRepository).findById(appId)

        verify(appsRepository).save(
                AppEntity(appId, "Sample", 11)
        )
    }
}