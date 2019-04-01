package com.ford.analytics.analytics

import org.assertj.core.api.Assertions
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.ResultActions

@SpringBootTest
@ActiveProfiles(profiles = arrayOf("test"))
@AutoConfigureMockMvc
@RunWith(SpringRunner::class)
abstract class AbstractIntegrationTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    protected fun assertThatProcessedExceptionHasMessage(badRequest: ResultActions, expectedMessage: String) {
        val exception = badRequest.andReturn().resolvedException
                ?: throw Exception("Request did not fail with an exception.")

        Assertions.assertThat(exception.message).isEqualTo(expectedMessage)
    }
}