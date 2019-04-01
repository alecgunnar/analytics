<template>
    <div>
        <div v-if="app === null"
             data-qa="loading"></div>
        <div v-else>
            <h1 data-qa="app-name">{{ app.name }}</h1>
        </div>
    </div>
</template>

<script>
    import AppsService from "@/services/AppsService"

    export default {
        name: "AppOverview",
        data () {
            return {
                app: null
            }
        },
        mounted () {
            AppsService.loadApplication(this.$route.params.id).then((data) => {
                this.app = data
            })
        }
    }
</script>

<style scoped>

</style>