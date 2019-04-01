package com.ford.analytics.analytics.applications

import com.fasterxml.jackson.databind.ObjectMapper
import com.ford.analytics.analytics.AbstractIntegrationTest
import org.junit.Test
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

class LoadAppControllerTest : AbstractIntegrationTest() {
    @Test
    fun `an application can be retrieved after it is created`() {
        val createAppRequest = mockMvc.perform(
                post("/apps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{" +
                                "   \"name\": \"sample app\"" +
                                "}")
        )

        createAppRequest.andExpect(status().is2xxSuccessful)

        val responseString = createAppRequest.andReturn().response.contentAsString
        val responseObject = ObjectMapper().readTree(responseString)

        val id = responseObject["data"]["id"].asText()

        val loadAppRequest = mockMvc.perform(
                get("/apps/$id")
        )

        loadAppRequest.andExpect(status().isOk)

        loadAppRequest.andExpect(
                content().json("{" +
                        "   \"id\": \"$id\"," +
                        "   \"name\": \"sample app\"" +
                        "}")
        )
    }

    @Test
    fun `an error is returned if an app with the requested id does not exist`() {
        mockMvc.perform(
                get("/apps/750c98e1-9cd7-4251-96d5-880d730324c1")
        ).andExpect(status().isNotFound)
    }
}