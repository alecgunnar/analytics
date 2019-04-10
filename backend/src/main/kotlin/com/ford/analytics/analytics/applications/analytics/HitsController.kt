package com.ford.analytics.analytics.applications.analytics

import com.ford.analytics.analytics.applications.analytics.data.HitsCount
import com.ford.analytics.analytics.applications.analytics.data.RegisterHitRequest
import org.springframework.web.bind.annotation.*
import java.net.URL
import java.util.*

@RestController
@RequestMapping("/apps/{appId}/hits")
class HitsController(
        val analyticsService: AnalyticsService
) {
    @GetMapping
    fun getHitsCount(
            @PathVariable appId: UUID
    ): HitsCount {
        return analyticsService.getHitsCount(appId)
    }

    @PostMapping
    fun registerHit(
            @PathVariable appId: UUID,
            @RequestBody registerHitRequest: RegisterHitRequest
    ) {
        return analyticsService.registerHit(appId, registerHitRequest)
    }
}