package com.ford.analytics.analytics

import org.junit.Test
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.Resource
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

class ScriptControllerTest : AbstractIntegrationTest() {
    @Value("classpath:client.js")
    lateinit var clientScript: Resource

    @Test
    fun `the client script is served`() {
        mockMvc.perform(
                get("/client")
        ).andExpect(status().isOk)
                .andExpect(
                        content().contentType(
                                MediaType.parseMediaType("text/javascript")
                        )
                )
                .andExpect(
                        content().bytes(clientScript.inputStream.readBytes())
                )
    }
}