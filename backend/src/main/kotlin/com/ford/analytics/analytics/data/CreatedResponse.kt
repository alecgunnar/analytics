package com.ford.analytics.analytics.data

data class CreatedResponse<T>(
        var status: String = "Unknown",
        var message: String = "Unknown status",
        var data: T? = null
)
