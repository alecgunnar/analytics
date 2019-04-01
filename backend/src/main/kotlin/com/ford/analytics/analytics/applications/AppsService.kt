package com.ford.analytics.analytics.applications

import com.ford.analytics.analytics.applications.data.AnalyticsApp
import com.ford.analytics.analytics.applications.data.CreateAppRequest
import org.springframework.stereotype.Service
import java.util.*

@Service
class AppsService {
    val storage: MutableList<AnalyticsApp> = mutableListOf()

    fun saveApp(createAppRequest: CreateAppRequest): AnalyticsApp {
        val newApp = AnalyticsApp(UUID.randomUUID(), createAppRequest.name)

        storage.add(newApp)

        return newApp
    }

    fun loadApp(id: UUID): AnalyticsApp? {
        return storage.find { it.id == id }
    }
}
