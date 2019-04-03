<template>
    <div>
        <div data-qa="hits-count">{{ count }}</div>
        Total Hits
    </div>
</template>

<script>
    import AnalyticsService from '@/services/AnalyticsService'

    let timeoutId

    export default {
        name: "HitsCounter",
        data () {
            return {
                count: 0
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