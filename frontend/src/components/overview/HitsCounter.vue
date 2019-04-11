<template>
    <div>
        <div class="hitsCount">
            <div data-qa="hits-count"
                 class="hitsCount__count">
                {{ count }}
            </div>
            Total Hits
        </div>
        <ul v-if="pages.length"
            data-qa="pages-list"
            class="listOfPages">
            <li v-for="page in pages"
                :key="page.url"
                data-qa="listed-page"
                class="listOfPages__page">
                <div data-qa="page-count"
                     class="listOfPages__count">
                    {{ page.count }}
                </div>
                <div data-qa="page-url"
                     class="listOfPages__url">
                    {{ page.url }}
                </div>
                <div data-qa="page-name"
                     class="listOfPages__name">
                    {{ page.name }}
                </div>
            </li>
        </ul>
        <p v-else
           data-qa="no-pages-message">
            No pages have been hit.
        </p>
    </div>
</template>

<script>
    import AnalyticsService from '@/services/AnalyticsService'

    let timeoutId

    export default {
        name: "HitsCounter",
        data() {
            return {
                count: 0,
                pages: []
            }
        },
        props: {
            app: {
                required: true
            }
        },
        mounted() {
            this.loadHitsCount()
        },
        methods: {
            hitsCountLoaded(data) {
                this.count = data.count
                this.pages = data.pages

                timeoutId = setTimeout(this.loadHitsCount, 5000)
            },
            loadHitsCount() {
                AnalyticsService.loadHitsCount(this.app.id)
                    .then(this.hitsCountLoaded)
            }
        },
        beforeDestroy() {
            clearTimeout(timeoutId)
        }
    }
</script>

<style scoped>
    .hitsCount {
        background-color: #ecf0f1;
        text-align: center;
        margin: 0 0 20px;
        padding: 20px;
        box-sizing: border-box;
    }

    .hitsCount__count {
        font-size: 1.5rem;
    }

    .listOfPages {
        list-style: none;
        padding: 0;
    }

    .listOfPages__page {
        margin: 0 0 20px;
    }

    .listOfPages__count {
        background-color: #ecf0f1;
        float: right;
        border-radius: 3px;
        padding: 10px 20px;
    }

    .listOfPages__name {
        color: #bdc3c7;
    }
</style>