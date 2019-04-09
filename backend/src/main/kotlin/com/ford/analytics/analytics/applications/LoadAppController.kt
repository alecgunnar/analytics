package com.ford.analytics.analytics.applications

import com.ford.analytics.analytics.applications.data.AnalyticsApp
import com.ford.analytics.analytics.applications.data.AnalyticsAppScript
import com.ford.analytics.analytics.applications.exceptions.AppNotFoundException
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
class LoadAppController(
        val appsService: AppsService
) {
    @GetMapping("/apps/{id}")
    fun loadApp(
            @PathVariable id: UUID
    ): AnalyticsApp {
        val app = appsService.loadApp(id)

        app ?: throw AppNotFoundException()

        return app
    }

    @GetMapping("/apps")
    fun loadApps(): List<AnalyticsApp> {
        return appsService.loadApps()
    }

    @GetMapping("/apps/{id}/script")
    fun getAppScript(
            @PathVariable id: UUID
    ): AnalyticsAppScript {
        return AnalyticsAppScript(id)
    }
}