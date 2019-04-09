package com.ford.analytics.analytics.applications.data

import java.util.*

data class AnalyticsAppScript(
        val id: UUID,

        val url: String,

        val script: String = "<script>var u='$url',s=document.createElement('script');s.src=u+'/client';s.onload=function(){analytics.run(u,'$id');};document.body.appendChild(s);</script>"
)
