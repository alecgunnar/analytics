package com.ford.analytics.analytics.applications

import com.ford.analytics.analytics.applications.data.AnalyticsApp
import com.ford.analytics.analytics.applications.data.CreateAppRequest
import com.ford.analytics.analytics.data.AppEntity
import org.springframework.stereotype.Service
import java.util.*
import kotlin.NoSuchElementException

@Service
class AppsService(
        val appsRepository: AppsRepository
) {
    val storage: MutableList<AnalyticsApp> = mutableListOf()

    fun saveApp(createAppRequest: CreateAppRequest): AnalyticsApp {
        return appsRepository.save(
                AppEntity(
                        name = createAppRequest.name
                )
        ).toDto()
    }

    fun loadApp(id: UUID): AnalyticsApp? {
        return try {
            val entity = appsRepository.findById(id).get()
            entity.let { it.toDto() }
        } catch (noElementException: NoSuchElementException) {
            null
        }
    }

    fun loadApps(): List<AnalyticsApp> {
        return appsRepository.findAll().map { it.toDto() }
    }

    fun deleteApps() {
        appsRepository.deleteAll()
    }
}
