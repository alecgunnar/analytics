package com.ford.analytics.analytics.applications.analytics.data

import com.ford.analytics.analytics.data.AppEntity
import java.net.URL
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.ManyToOne

@Entity
data class HitEntity(
        @Id
        val url: URL,

        val name: String,

        var count: Int,

        @ManyToOne
        val app: AppEntity
) {
        fun incrementCount() = count++
}
