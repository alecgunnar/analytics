<template>
    <div>
        <div data-qa="hits-count">{{ count }}</div>
        Total Hits
        <ul data-qa="pages-list"
            v-if="pages.length">
            <li data-qa="listed-page"
                v-for="page in pages"
                :key="page.url">
                {{ page.url }} ({{ page.name }}) {{ page.count }}
            </li>
        </ul>
        <div data-qa="no-pages-message"
             v-else>No pages have been hit.</div>
    </div>
</template>

<script>
    import AnalyticsService from '@/services/AnalyticsService'

    let timeoutId

    export default {
        name: "HitsCounter",
        data () {
            return {
                count: 0,
                pages: []
            }
        },
        props: {
            app: {
                required: true
            }
        },
        mounted () {
            this.loadHitsCount()
        },
        methods: {
            hitsCountLoaded (data) {
                this.count = data.count
                this.pages = data.pages

                timeoutId = setTimeout(this.loadHitsCount, 5000)
            },
            loadHitsCount () {
                AnalyticsService.loadHitsCount(this.app.id)
                    .then(this.hitsCountLoaded)
            }
        },
        beforeDestroy () {
            clearTimeout(timeoutId)
        }
    }
</script>

<style scoped>

</style>