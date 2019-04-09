package com.ford.analytics.analytics.applications

import com.ford.analytics.analytics.data.AppEntity
import org.springframework.data.repository.CrudRepository
import java.util.*

interface AppsRepository: CrudRepository<AppEntity, UUID>