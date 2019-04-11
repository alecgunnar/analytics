<template>
    <div class="clientScript">
        <h2>Gathering Data</h2>
        <p>Add the following script to your product in a location which ensures it will run during each page load.</p>
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

    }

    .clientScript__script {
        background-color: #ecf0f1;
        font-family: courier, serif;
        word-break: break-word;
        text-align: left;
        padding: 20px;
        box-sizing: border-box;
    }
</style>