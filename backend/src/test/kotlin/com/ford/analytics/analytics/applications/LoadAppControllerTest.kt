package com.ford.analytics.analytics.applications

import com.fasterxml.jackson.databind.ObjectMapper
import com.ford.analytics.analytics.AbstractIntegrationTest
import org.junit.Before
import org.junit.Test
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

class LoadAppControllerTest : AbstractIntegrationTest() {
    @Before
    fun setup() {
        mockMvc.perform(
                delete("/apps")
        )
    }

    @Test
    fun `an application can be retrieved after it is created`() {
        val id = createApplication("sample app")

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

    @Test
    fun `all applications can be loaded`() {
        val id = createApplication("test app")

        mockMvc.perform(
                get("/apps")
        ).andExpect(status().isOk)
                .andExpect(content().json("[" +
                        "   {" +
                        "       \"id\": \"$id\"," +
                        "       \"name\": \"test app\"" +
                        "   }" +
                        "]"))
    }

    @Test
    fun `the script for the application can be retrieved`() {
        val id = createApplication("test app")

        mockMvc.perform(
                get("/apps/$id/script")
        ).andExpect(status().isOk)
                .andExpect(content().json("{" +
                        "   \"script\": \"<script>var u='http://localhost:80',s=document.createElement('script');s.src=u+'/client';s.onload=function(){analytics.run(u,'$id');};document.body.appendChild(s);</script>\"" +
                        "}"))
    }

    private fun createApplication(appName: String): String {
        val createAppRequest = mockMvc.perform(
                post("/apps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{" +
                                "   \"name\": \"$appName\"" +
                                "}")
        )

        createAppRequest.andExpect(status().is2xxSuccessful)

        val responseString = createAppRequest.andReturn().response.contentAsString
        val responseObject = ObjectMapper().readTree(responseString)

        return responseObject["data"]["id"].asText()
    }
}