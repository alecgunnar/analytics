import LoadAppForm from '@/components/loadApp/LoadAppForm'
import AppsService from "@/services/AppsService"
import {shallowMount, createLocalVue} from "@vue/test-utils";
import Router from "vue-router"
import {expect} from "chai"
import sinon from "sinon"
import {SynchronousPromise} from "synchronous-promise";

describe('LoadAppForm', () => {
    let subject

    let loadAppsPromise

    beforeEach(() => {
        loadAppsPromise = SynchronousPromise.unresolved()

        sinon.stub(AppsService, 'loadApplications').returns(loadAppsPromise)

        const localVue = createLocalVue()
        localVue.use(Router)

        const router = new Router()

        subject = shallowMount(LoadAppForm, {
            router,
            localVue
        })
    })

    afterEach(() => {
        AppsService.loadApplications.restore()
    })

    it('loads apps from the service', () => {
        sinon.assert.calledOnce(AppsService.loadApplications);
    })

    context('the apps are loaded', () => {
        beforeEach(() => {
            loadAppsPromise.resolve([
                {
                    id: 'c53b3ec2-7528-4534-a260-59b74c0aa75a',
                    name: 'Sample App'
                },
                {
                    id: '58a89f88-c1dd-4842-a224-1e911b7d5437',
                    name: 'Test App'
                }
            ])
        })

        it('renders a list of apps', () => {
            expect(subject.findAll('[data-qa=existing-app]').length).to.equal(2)
        })

        it('renders a link for each app', () => {
            const firstApp = subject.find('[data-qa=existing-app]')
            const linkToApp = firstApp.find({name: 'RouterLink'});

            expect(linkToApp.exists()).to.be.true
            expect(linkToApp.props('to')).to.deep.equal({
                name: 'appOverview',
                params: {
                    id: 'c53b3ec2-7528-4534-a260-59b74c0aa75a'
                }
            })
            expect(linkToApp.text()).to.equal('Sample App')
        })
    })
})