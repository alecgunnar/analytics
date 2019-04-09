<template>
    <div class="clientScript">
        Add the following script to your page:
        <div data-qa="client-script"
             class="clientScript__script">
            {{ script }}
        </div>
    </div>
</template>

<script>
    import AppsService from '@/services/AppsService'

    export default {
        name: "ScriptLoader",
        data() {
            return {
                script: ''
            }
        },
        props: {
            app: {
                required: true
            }
        },
        mounted() {
            AppsService.loadClientScript(this.app.id)
                .then(this.clientScriptLoaded)
        },
        methods: {
            clientScriptLoaded(script) {
                this.script = script
            }
        }
    }
</script>

<style scoped>
    .clientScript {
        margin: 20px 0 0;
    }

    .clientScript__script {
        background-color: #F1F1F1;
    }
</style>