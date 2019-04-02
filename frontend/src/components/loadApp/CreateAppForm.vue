<template>
    <div>
        <h2>Create an app</h2>
        <input data-qa="new-app-name-input"
               v-model="appName" />
        <button data-qa="create-app-submit-button"
                @click="saveApp"
                :disabled="appName === ''">Save</button>
    </div>
</template>

<script>
    import AppsService from "@/services/AppsService"

    export default {
        name: "CreateAppForm",
        data () {
            return {
                appName: ''
            }
        },
        methods: {
            saveApp() {
                AppsService.createApplication(this.appName)
                    .then(this.appCreated)
            },
            appCreated(id) {
                this.appName = ''
                this.$emit('created', id)
            }
        }
    }
</script>

<style scoped>

</style>