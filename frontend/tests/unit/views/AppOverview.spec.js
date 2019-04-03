import {shallowMount} from "@vue/test-utils";
import {expect} from "chai"
import sinon from "sinon"
import {SynchronousPromise} from "synchronous-promise";
import AppOverview from '@/views/AppOverview'
import AppsService from '@/services/AppsService'
import HitsCounter from '@/components/overview/HitsCounter'

describe('AppOverview', () => {
    let subject

    let loadDataPromise

    beforeEach(() => {
        loadDataPromise = SynchronousPromise.unresolved()

        sinon.stub(AppsService, 'loadApplication').returns(loadDataPromise)

        const $route = {
            params: {
                id: 'fe4b0f65-9126-4e4e-907d-d0c7e4095f91'
            }
        }

        subject = shallowMount(AppOverview, {
            mocks: {
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
})