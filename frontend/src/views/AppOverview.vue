<template>
    <div>
        <div v-if="app === null"
             data-qa="loading">Loading...
        </div>
        <div v-else>
            <h1 data-qa="app-name">{{ app.name }}</h1>
            <div class="sideBySide">
                <HitsCounter :app="app"
                             class="sideBySide__side sideBySide__side--left"/>
                <ScriptLoader :app="app"
                              class="sideBySide__side sideBySide__side--right"/>
            </div>
        </div>
    </div>
</template>

<script>
    import AppsService from "@/services/AppsService"
    import HitsCounter from "../components/overview/HitsCounter";
    import ScriptLoader from "../components/overview/ScriptLoader";

    export default {
        name: "AppOverview",
        data() {
            return {
                app: null
            }
        },
        mounted() {
            AppsService.loadApplication(this.$route.params.id)
                .then(this.appLoaded)
                .catch(this.appNotLoaded)
        },
        methods: {
            appLoaded(data) {
                this.app = data
            },
            appNotLoaded() {
                this.$router.push({
                    name: 'error',
                    params: {
                        type: '404'
                    }
                })
            }
        },
        components: {
            ScriptLoader,
            HitsCounter
        }
    }
</script>

<style scoped>

</style>