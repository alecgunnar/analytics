<template>
    <div>
        <h1>Something went wrong</h1>
        <p data-qa="not-found-error" v-if="errorIs('404')">We could not find what you are looking for.</p>
        <p data-qa="generic-error" v-else>There was an unknown error.</p>
        <RouterLink data-qa="link-to-home" :to="{ name: 'home' }">Home</RouterLink>
    </div>
</template>

<script>
    export default {
        name: 'error',
        methods: {
            errorIs (type) {
                return this.$route.params.type === type
            }
        }
    }
</script>

<style scoped>

</style>