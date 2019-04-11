import {shallowMount, createLocalVue} from "@vue/test-utils";
import Router from 'vue-router'
import {expect} from "chai"
import Error from '@/views/Error'

describe('Error', () => {
    const mountSubject = (type) => {
        const localVue = createLocalVue()
        localVue.use(Router)

        const router = new Router({
            routes: [
                {
                    path: '/error/:type',
                    name: 'error',
                    component: {
                        render() {
                        }
                    }
                }
            ]
        })

        router.push({
            name: 'error',
            params: {
                type
            }
        })

        return shallowMount(Error, {
            localVue,
            router
        })
    }

    it('shows a generic error message', () => {
        const subject = mountSubject('500')

        expect(subject.find('[data-qa=generic-error]').exists()).to.be.true
    })

    it('shows a not found error message', () => {
        const subject = mountSubject('404')

        expect(subject.find('[data-qa=generic-error]').exists()).to.be.false
        expect(subject.find('[data-qa=not-found-error]').exists()).to.be.true
    })

    it('provides a link to home', () => {
        const subject = mountSubject('401')

        const linkToHome = subject.find('[data-qa=link-to-home]')

        expect(linkToHome.exists()).to.be.true
        expect(linkToHome.props('to')).to.deep.equal({
            name: 'home'
        })
    })
})