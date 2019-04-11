<template>
    <div class="home">
        <h1>Welcome</h1>
        <div class="sideBySide">
            <CreateAppForm class="sideBySide__side sideBySide__side--left createApp"
                           @created="goToApp"/>
            <LoadAppForm class="sideBySide__side sideBySide__side--right"
                         @loaded="goToApp"/>
        </div>
    </div>
</template>

<script>
    import CreateAppForm from "../components/loadApp/CreateAppForm";
    import LoadAppForm from "../components/loadApp/LoadAppForm";

    export default {
        name: 'home',
        methods: {
            goToApp(id) {
                this.$router.push({
                    name: 'appOverview',
                    params: {id}
                })
            }
        },
        components: {
            LoadAppForm,
            CreateAppForm
        }
    }
</script>

<style scoped>
    .createApp {
        background-color: #ecf0f1;
        padding: 20px;
    }
</style>
