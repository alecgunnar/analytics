package com.ford.analytics.analytics.applications.analytics

import com.ford.analytics.analytics.AppsRepository
import com.ford.analytics.analytics.applications.analytics.data.HitsCount
import org.springframework.stereotype.Service
import java.util.*

@Service
class AnalyticsService(
        val appsRepository: AppsRepository
) {
    fun getHitsCount(appId: UUID): HitsCount {
        return HitsCount(
                loadApp(appId).hits
        )
    }

    fun registerHit(appId: UUID) {
        val app = loadApp(appId)

        app.incrementHitsCount()

        appsRepository.save(app)
    }

    private fun loadApp(appId: UUID) = appsRepository.findById(appId).get()
}
