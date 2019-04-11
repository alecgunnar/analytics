import {shallowMount, createLocalVue} from '@vue/test-utils'
import {expect} from 'chai'
import Router from 'vue-router'
import App from '@/App'

describe('App', () => {
    let subject, router

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Router)

        router = new Router({
            routes: [
                {
                    path: '/',
                    name: 'home'
                },
                {
                    path: '/other',
                    name: 'other'
                }
            ]
        })

        subject = shallowMount(App, {
            router, localVue
        })
    })

    context('on the homepage', () => {
        beforeEach(() => {
            router.push({name: 'home'})
        })

        it('does not show the back button', () => {
            const backButton = subject.find('[data-qa=back-button]')

            expect(backButton.exists()).to.be.false
        })
    })

    context('on a page other than the homepage', () => {
        let backButton

        beforeEach(() => {
            router.push({name: 'other'})

            backButton = subject.find('[data-qa=back-button]')
        })

        it('does not show the back button', () => {
            expect(backButton.exists()).to.be.true
        })

        context('the back button is clicked', () => {
            beforeEach(() => {
                backButton.trigger('click')
            })

            it('directs the user to the homepage', () => {
                expect(router.history.current.name).to.equal('home')
            })
        })
    })
})