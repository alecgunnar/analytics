package com.ford.analytics.analytics.analytics

import com.ford.analytics.analytics.analytics.data.HitsCount
import org.springframework.web.bind.annotation.*
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
            @PathVariable appId: UUID
    ) {
        return analyticsService.registerHit(appId)
    }
}