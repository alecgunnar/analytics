package com.ford.analytics.analytics.applications

import com.ford.analytics.analytics.applications.data.AnalyticsApp
import com.ford.analytics.analytics.applications.data.CreateAppRequest
import com.ford.analytics.analytics.data.CreatedResponse
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletResponse

@RestController
class CreateAppController(
        val appsService: AppsService
) {
    @CrossOrigin(origins = ["http://localhost:8081"])
    @PostMapping("/apps")
    fun createApp(
            @RequestBody createAppRequest: CreateAppRequest,
            response: HttpServletResponse
    ): CreatedResponse<AnalyticsApp> {
        val createdApp = appsService.saveApp(createAppRequest)

        response.status = HttpServletResponse.SC_CREATED

        return CreatedResponse("Ok", "Created application", createdApp)
    }
}
