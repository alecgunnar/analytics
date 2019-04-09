package com.ford.analytics.analytics.applications.data

import java.util.*

data class AnalyticsAppScript(
        val id: UUID,

        val script: String = "<script>var a='$id';var s=document.createElement('script');s.src='http://localhost:8080/client';s.onload=function(){analytics.run(a);};document.body.appendChild(s);</script>"
)
