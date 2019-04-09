<template>
    <form data-qa="create-app-form"
          @submit="saveApp">
        <h2>Create an app</h2>
        <p>Enter the name of your application:</p>
        <input data-qa="new-app-name-input"
               v-model="appName" />
        <button data-qa="create-app-submit-button"
                :disabled="appName === ''">Create</button>
    </form>
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
            saveApp(e) {
                e.preventDefault()

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