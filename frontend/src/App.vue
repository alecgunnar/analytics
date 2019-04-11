<template>
    <div id="app">
        <header class="header">
            <div class="wrapper">
                <div v-if="showBackButton"
                     class="header__goBack">
                    <button data-qa="back-button"
                            class="header__backButton"
                            @click="goHome">
                        &larr; Home
                    </button>
                </div>
                <div class="header__logo">analytics</div>
            </div>
        </header>
        <main class="main">
            <div class="wrapper">
                <router-view/>
            </div>
        </main>
    </div>
</template>

<script>
    export default {
        name: 'App',
        computed: {
            showBackButton() {
                return this.$route.name !== 'home'
            }
        },
        methods: {
            goHome() {
                this.$router.push({name: 'home'})
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        max-width: 1280px;
        margin: 0 auto;
    }

    .header,
    .main {
        padding: 20px;
    }

    .header {
        background-color: #3498DB;
        color: #FFF;
        font-size: 2rem;
        line-height: 2rem;
    }

    .header__goBack {
        float: right;
    }

    .header__backButton {
        background: transparent;
        font-size: 1.25rem;
        padding: 0;
    }
</style>
