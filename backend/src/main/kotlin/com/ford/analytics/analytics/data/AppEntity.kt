package com.ford.analytics.analytics.data

import com.ford.analytics.analytics.applications.data.AnalyticsApp
import java.util.*
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
data class AppEntity(
        @Id
        @GeneratedValue
        val id: UUID = UUID.randomUUID(),

        val name: String = ""
) {
        fun toDto(): AnalyticsApp = AnalyticsApp(id, name)
}
