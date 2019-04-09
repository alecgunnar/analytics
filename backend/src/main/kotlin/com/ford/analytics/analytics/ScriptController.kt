package com.ford.analytics.analytics

import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.Resource
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletResponse

@RestController
class ScriptController(
        @Value("classpath:client.js")
        val clientScript: Resource
) {
    @GetMapping("/client")
    fun getAnalyticsClient(
            response: HttpServletResponse
    ): ByteArray {
        response.contentType = "text/javascript"

        return clientScript.file.readBytes()
    }
}