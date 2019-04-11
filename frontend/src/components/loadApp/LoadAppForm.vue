<template>
    <section>
        <h2>Load an app</h2>
        <ul v-if="apps.length"
            data-qa="list-of-apps"
            class="apps">
            <li v-for="app in apps"
                :key="app.id"
                data-qa="existing-app">
                <RouterLink data-qa="go-to-app"
                            :to="{name: 'appOverview', params: {id: app.id}}">
                    {{ app.name }}
                </RouterLink>
            </li>
        </ul>
        <p v-else
           data-qa="no-apps-message">
            No apps have been created.
        </p>
    </section>
</template>

<script>
    import AppsService from "@/services/AppsService"

    export default {
        name: "LoadAppForm",
        data () {
            return {
                apps: []
            }
        },
        mounted () {
            AppsService.loadApplications()
                .then(this.appsLoaded)
        },
        methods: {
            appsLoaded (apps) {
                this.apps = apps
            }
        }
    }
</script>

<style scoped>
.apps {
    list-style: none;
    padding: 0;
}
</style>