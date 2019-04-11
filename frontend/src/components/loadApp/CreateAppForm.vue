<template>
    <section>
        <h2>Create an app</h2>
        <p>Enter the name of your application:</p>
        <form data-qa="create-app-form"
              class="form"
              @submit="saveApp">
            <input data-qa="new-app-name-input"
                   type="text"
                   v-model="appName"/>
            <button data-qa="create-app-submit-button"
                    :disabled="appName === ''">Create
            </button>
        </form>
    </section>
</template>

<script>
    import AppsService from "@/services/AppsService"

    export default {
        name: "CreateAppForm",
        data() {
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
    .form {
        display: flex;
    }

    .form input {
        flex-grow: 1;
        margin: 0 20px 0 0;
    }
</style>