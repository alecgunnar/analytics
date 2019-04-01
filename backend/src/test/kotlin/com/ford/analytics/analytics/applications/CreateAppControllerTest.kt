package com.ford.analytics.analytics.applications

import com.ford.analytics.analytics.AbstractIntegrationTest
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.http.MediaType
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.context.web.WebAppConfiguration
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@RunWith(SpringRunner::class)
@WebAppConfiguration
class CreateAppControllerTest: AbstractIntegrationTest() {
    @Test
    fun `an application can be created`() {
        val request = mockMvc.perform(
                post("/apps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{" +
                                "   \"name\": \"sample app\"" +
                                "}")
        )

        request.andExpect(status().isCreated)
        request.andExpect(
                content().json("{" +
                        "   \"status\": \"Ok\"," +
                        "   \"message\": \"Created application\"," +
                        "   \"data\": {" +
                        "       \"name\": \"sample app\"" +
                        "   }" +
                        "}"
                )
        )
    }
}
