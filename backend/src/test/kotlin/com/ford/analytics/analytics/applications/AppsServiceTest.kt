package com.ford.analytics.analytics.applications

import com.ford.analytics.analytics.AppsRepository
import com.ford.analytics.analytics.applications.data.AnalyticsApp
import com.ford.analytics.analytics.applications.data.CreateAppRequest
import com.ford.analytics.analytics.data.AppEntity
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.ArgumentCaptor
import org.mockito.ArgumentMatchers.any
import org.mockito.Mock
import org.mockito.Mockito.`when`
import org.mockito.Mockito.verify
import org.mockito.junit.MockitoJUnitRunner
import java.util.*

@RunWith(MockitoJUnitRunner::class)
class AppsServiceTest {
    @Mock
    lateinit var appsRepository: AppsRepository

    @Test
    fun `saves new application`() {
        val subject = AppsService(appsRepository)
        val captor = ArgumentCaptor.forClass(AppEntity::class.java)

        val createAppRequest = CreateAppRequest("hello world")

        val savedEntity = AppEntity(UUID.randomUUID(), "saved")
        `when`(appsRepository.save(any<AppEntity>())).thenReturn(savedEntity)

        val app = subject.saveApp(createAppRequest)

        verify(appsRepository).save(captor.capture())

        val expectedEntity = captor.value

        assertThat(expectedEntity.name).isEqualTo("hello world")

        assertThat(app).isEqualTo(
                AnalyticsApp(savedEntity.id, savedEntity.name)
        )
    }

    @Test
    fun `a created app can be retrieved`() {
        val subject = AppsService(appsRepository)
        val id = UUID.randomUUID()

        `when`(appsRepository.findById(id)).thenReturn(Optional.of(AppEntity(id, "Sample")))

        val retrievedApp = subject.loadApp(id)!!

        assertThat(retrievedApp.id).isEqualTo(id)
        assertThat(retrievedApp.name).isEqualTo("Sample")
    }

    @Test
    fun `cannot retrieve app that does not exist`() {
        val subject = AppsService(appsRepository)
        val id = UUID.randomUUID()

        `when`(appsRepository.findById(id)).thenReturn(Optional.empty())

        val retrievedApp = subject.loadApp(id)

        assertThat(retrievedApp).isNull()
    }

    @Test
    fun `all created apps can be retrieved`() {
        val subject = AppsService(appsRepository)

        val firstId = UUID.randomUUID()
        val secondId = UUID.randomUUID()

        `when`(appsRepository.findAll()).thenReturn(
                listOf(
                        AppEntity(firstId, "first"),
                        AppEntity(secondId, "second")
                )
        )

        val allApps = subject.loadApps()

        assertThat(allApps).containsExactly(
                AnalyticsApp(firstId, "first"),
                AnalyticsApp(secondId, "second")
        )
    }

    @Test
    fun `all apps can be deleted`() {
        val subject = AppsService(appsRepository)

        subject.deleteApps()

        verify(appsRepository).deleteAll()
    }
}