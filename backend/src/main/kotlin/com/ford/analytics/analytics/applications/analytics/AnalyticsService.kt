package com.ford.analytics.analytics.applications.analytics

import com.ford.analytics.analytics.applications.analytics.data.HitsCount
import org.springframework.stereotype.Service
import java.util.*

@Service
class AnalyticsService {
    val storage: MutableMap<UUID, Int> = mutableMapOf()

    fun getHitsCount(appId: UUID): HitsCount {
        return HitsCount(storage[appId] ?: 0)
    }

    fun registerHit(appId: UUID) {
        val hitsSoFar = getHitsCount(appId).count
        storage[appId] = hitsSoFar + 1
    }
}
