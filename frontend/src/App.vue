<template>
    <div id="app">
        <header class="header">
            <div class="wrapper">
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
    }
</style>
