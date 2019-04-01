package com.ford.analytics.analytics.configuration

import org.springframework.stereotype.Component
import javax.servlet.*
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class CorsFilter: Filter {
    override fun destroy() {}

    override fun init(filterConfig: FilterConfig?) {}

    override fun doFilter(
            request: ServletRequest,
            response: ServletResponse,
            chain: FilterChain
    ) {
        val res = response as HttpServletResponse

        val allowedOrigin = (request as HttpServletRequest).getHeader("Origin") ?: "*"

        res.setHeader("Access-Control-Allow-Origin", allowedOrigin)
        res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH")
        res.setHeader("Access-Control-Allow-Headers", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true")

        chain.doFilter(request, response)
    }
}