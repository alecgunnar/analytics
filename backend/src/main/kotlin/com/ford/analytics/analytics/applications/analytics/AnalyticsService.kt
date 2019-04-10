package com.ford.analytics.analytics.applications.analytics

import com.ford.analytics.analytics.applications.AppsRepository
import com.ford.analytics.analytics.applications.analytics.data.HitEntity
import com.ford.analytics.analytics.applications.analytics.data.HitsCount
import com.ford.analytics.analytics.applications.analytics.data.Page
import com.ford.analytics.analytics.applications.analytics.data.RegisterHitRequest
import com.ford.analytics.analytics.applications.exceptions.AppNotFoundException
import com.ford.analytics.analytics.data.AppEntity
import org.springframework.stereotype.Service
import java.util.*

@Service
class AnalyticsService(
        val appsRepository: AppsRepository,
        val hitsRepository: HitsRepository
) {
    fun getHitsCount(appId: UUID): HitsCount {
        val app = loadApp(appId)
        val hits = hitsRepository.findByApp(app)

        val count = hits.fold(0) { count, hit -> count + hit.count }
        val pages = hits.map { Page(it.name, it.url, it.count) }

        return HitsCount(count, pages)
    }

    fun registerHit(appId: UUID, registerHitRequest: RegisterHitRequest) {
        val app = loadApp(appId)

        val possibleHit = hitsRepository.findById(registerHitRequest.url)
        var hit = HitEntity(registerHitRequest.url, registerHitRequest.title, 0, app)

        if (possibleHit.isPresent) hit = possibleHit.get()

        hit.incrementCount()

        hitsRepository.save(hit)
    }

    private fun loadApp(appId: UUID): AppEntity {
        val possibleApp = appsRepository.findById(appId)
        if (!possibleApp.isPresent) throw AppNotFoundException()
        return possibleApp.get()
    }
}
