package com.ford.analytics.analytics.applications.analytics

import com.ford.analytics.analytics.applications.analytics.data.HitEntity
import com.ford.analytics.analytics.data.AppEntity
import org.springframework.data.repository.CrudRepository
import java.net.URL

interface HitsRepository: CrudRepository<HitEntity, URL> {
    fun findByApp(appEntity: AppEntity): List<HitEntity>
}