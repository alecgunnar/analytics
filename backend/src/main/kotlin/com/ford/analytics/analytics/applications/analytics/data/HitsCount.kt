package com.ford.analytics.analytics.applications.analytics.data

data class HitsCount(
        val count: Int,

        val pages: List<Page> = emptyList()
)
