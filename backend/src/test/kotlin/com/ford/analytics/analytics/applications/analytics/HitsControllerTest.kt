package com.ford.analytics.analytics.applications.analytics

import com.fasterxml.jackson.databind.ObjectMapper
import com.ford.analytics.analytics.AbstractIntegrationTest
import org.junit.Before
import org.junit.Test
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

class HitsControllerTest : AbstractIntegrationTest() {
    lateinit var appId: String

    @Before
    fun setup () {
        appId = createApp()
    }

    private fun createApp(): String {
        val request = mockMvc.perform(
                post("/apps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{" +
                                "   \"name\": \"test app\"" +
                                "}")
        )

        request.andExpect(status().is2xxSuccessful)

        val responseString = request.andReturn().response.contentAsString
        val responseObject = ObjectMapper().readTree(responseString)

        return responseObject["data"]["id"].asText()
    }

    @Test
    fun `the number of hits can be retrieved and defaults to zero`() {
        mockMvc.perform(
                get("/apps/$appId/hits")
        ).andExpect(status().isOk)
                .andExpect(content().json("{" +
                        "   \"count\": 0" +
                        "}"))
    }

    @Test
    fun `the total number of hits is returned`() {
        mockMvc.perform(
                post("/apps/$appId/hits")
        ).andExpect(status().is2xxSuccessful)

        mockMvc.perform(
                get("/apps/$appId/hits")
        ).andExpect(status().isOk)
                .andExpect(content().json("{" +
                        "   \"count\": 1," +
                        "   \"tags\": []" +
                        "}"))
    }
}