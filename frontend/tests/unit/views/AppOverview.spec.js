import {shallowMount} from "@vue/test-utils";
import {expect} from "chai"
import sinon from "sinon"
import {SynchronousPromise} from "synchronous-promise";
import Router from 'vue-router'
import AppOverview from '@/views/AppOverview'
import AppsService from '@/services/AppsService'
import HitsCounter from '@/components/overview/HitsCounter'

describe('AppOverview', () => {
    let subject

    let $router

    let loadDataPromise

    beforeEach(() => {
        loadDataPromise = SynchronousPromise.unresolved()

        sinon.stub(AppsService, 'loadApplication').returns(loadDataPromise)

        const $route = {
            params: {
                id: 'fe4b0f65-9126-4e4e-907d-d0c7e4095f91'
            }
        }

        $router = new Router()

        subject = shallowMount(AppOverview, {
            mocks: {
                $router,
                $route
            }
        })
    })

    afterEach(() => {
        AppsService.loadApplication.restore()
    })

    it('shows the loading screen', () => {
        expect(subject.find('[data-qa=loading').exists()).to.be.true
    })

    it('loads the app information', () => {
        sinon.assert.calledOnce(AppsService.loadApplication)
        sinon.assert.calledWith(AppsService.loadApplication, 'fe4b0f65-9126-4e4e-907d-d0c7e4095f91')
    })

    context('the app data is loaded', () => {
        const appData = {
            id: 'fe4b0f65-9126-4e4e-907d-d0c7e4095f91',
            name: 'Sample App'
        }

        beforeEach(() => {
            loadDataPromise.resolve(appData)
        })

        it('does not show the loading screen', () => {
            expect(subject.find('[data-qa=loading').exists()).to.be.false
        })

        it('shows the name of the application', () => {
            expect(subject.find('[data-qa=app-name]').text()).to.equal('Sample App')
        })

        it('shows the hits counter', () => {
            const hitsCounter = subject.find(HitsCounter);

            expect(hitsCounter.exists()).to.be.true
            expect(hitsCounter.props('app')).to.deep.equal(appData)
        })
    })

    context('the app data cannot be loaded', () => {
        beforeEach(() => {
            sinon.stub($router, 'push')

            loadDataPromise.reject()
        })

        afterEach(() => {
            $router.push.restore()
        })

        it('redirects to the error page', () => {
            sinon.assert.calledOnce($router.push)
            sinon.assert.calledWith($router.push, {
                name: 'error',
                params: {
                    type: '404'
                }
            })
        })
    })
})