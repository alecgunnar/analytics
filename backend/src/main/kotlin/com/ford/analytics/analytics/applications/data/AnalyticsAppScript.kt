package com.ford.analytics.analytics.applications.data

import java.util.*

data class AnalyticsAppScript(
        val id: UUID,

        val script: String = "<script>var s=document.createElement('script');s.src='http://localhost:8080/client';s.onload=function(){analytics.run('$id');};document.body.appendChild(s);</script>"
)
