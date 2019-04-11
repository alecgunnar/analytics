<template>
    <div>
        <div class="stats">
            <div class="stats__count">
                <div data-qa="hits-count"
                     class="stats__value">
                    {{ count }}
                </div>
                Total Hits
            </div>
            <div class="stats__count">
                <div data-qa="pages-count"
                     class="stats__value">
                    {{ pages.length }}
                </div>
                Different Pages
            </div>
        </div>
        <ul v-if="pages.length"
            data-qa="pages-list"
            class="listOfPages">
            <li v-for="page in sortedPages"
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
        computed: {
            sortedPages () {
                const sortedPages = [].concat(this.pages)

                sortedPages.sort((a, b) => {
                    return b.count - a.count
                })

                return sortedPages
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
    .stats {
        display: flex;
        margin: 0 0 20px;
    }

    .stats__count {
        background-color: #ecf0f1;
        text-align: center;
        margin: 0 10px;
        padding: 20px;
        box-sizing: border-box;
        width: 50%;
    }

    .stats__count:first-of-type {
        margin-left: 0;
    }

    .stats__count:last-of-type {
        margin-right: 0;
    }

    .stats__value {
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
        text-align: center;
        float: right;
        width: 75px;
        border-radius: 3px;
        padding: 10px 20px;
        box-sizing: border-box;
    }

    .listOfPages__name {
        color: #bdc3c7;
    }
</style>