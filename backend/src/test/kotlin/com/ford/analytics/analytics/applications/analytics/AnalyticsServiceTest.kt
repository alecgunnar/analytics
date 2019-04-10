package com.ford.analytics.analytics.applications.analytics

import com.ford.analytics.analytics.applications.AppsRepository
import com.ford.analytics.analytics.applications.analytics.data.HitEntity
import com.ford.analytics.analytics.applications.analytics.data.Page
import com.ford.analytics.analytics.applications.analytics.data.RegisterHitRequest
import com.ford.analytics.analytics.applications.exceptions.AppNotFoundException
import com.ford.analytics.analytics.data.AppEntity
import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.junit.MockitoJUnitRunner
import java.net.URL
import java.util.*

@RunWith(MockitoJUnitRunner::class)
class AnalyticsServiceTest {
    @Mock
    lateinit var appsRepository: AppsRepository

    @Mock
    lateinit var hitsRepository: HitsRepository

    lateinit var subject: AnalyticsService

    lateinit var appId: UUID

    lateinit var appEntity: AppEntity

    @Before
    fun setup() {
        subject = AnalyticsService(appsRepository, hitsRepository)
        appId = UUID.randomUUID()

        appEntity = AppEntity(appId, "Sample")

        `when`(appsRepository.findById(any<UUID>())).thenReturn(
                Optional.of(appEntity)
        )

        `when`(hitsRepository.findByApp(appEntity)).thenReturn(
                listOf(
                        HitEntity(
                                URL("http://www.sample.com"),
                                "Sample App",
                                10,
                                appEntity
                        ),
                        HitEntity(
                                URL("http://www.sample.com/buy-now"),
                                "Sample App - Buy Now",
                                7,
                                appEntity
                        )
                )
        )
    }

    @Test
    fun `number of hits is returned`() {
        val hitsCount = subject.getHitsCount(appId)

        assertThat(hitsCount.count).isEqualTo(17)
        assertThat(hitsCount.pages).containsExactly(
                Page("Sample App", URL("http://www.sample.com"), 10),
                Page("Sample App - Buy Now", URL("http://www.sample.com/buy-now"), 7)
        )

        verify(appsRepository).findById(appId)
        verify(hitsRepository).findByApp(appEntity)
    }

    @Test(expected = AppNotFoundException::class)
    fun `cannot return hits for an app that does not exist`() {
        `when`(appsRepository.findById(appId)).thenReturn(
                Optional.empty()
        )

        subject.getHitsCount(appId)
    }

    @Test
    fun `hits are registered for the first time`() {
        val pageUrl = URL("http://www.sample.com")

        `when`(hitsRepository.findById(pageUrl)).thenReturn(Optional.empty())

        subject.registerHit(appId, RegisterHitRequest(pageUrl, "Hello World"))

        verify(appsRepository).findById(appId)
        verify(hitsRepository).findById(pageUrl)
        verify(hitsRepository).save(HitEntity(pageUrl, "Hello World", 1, appEntity))
    }

    @Test
    fun `additional hits are registered`() {
        val pageUrl = URL("http://www.sample.com")

        `when`(hitsRepository.findById(pageUrl)).thenReturn(
                Optional.of(
                        HitEntity(pageUrl, "Hello World", 1, appEntity)
                )
        )

        subject.registerHit(appId, RegisterHitRequest(pageUrl, "Hello World"))

        verify(appsRepository).findById(appId)
        verify(hitsRepository).findById(pageUrl)
        verify(hitsRepository).save(HitEntity(pageUrl, "Hello World", 2, appEntity))
    }

    @Test(expected = AppNotFoundException::class)
    fun `hits cannot be registered if the app does not exist`() {
        val pageUrl = URL("http://www.sample.com")

        `when`(appsRepository.findById(appId)).thenReturn(
                Optional.empty()
        )

        subject.registerHit(appId, RegisterHitRequest(pageUrl, "Hello World"))
    }
}