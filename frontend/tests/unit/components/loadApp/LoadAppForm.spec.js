import LoadAppForm from '@/components/loadApp/LoadAppForm'
import AppsService from "@/services/AppsService"
import {mount, createLocalVue} from "@vue/test-utils";
import Router from "vue-router"
import {expect} from "chai"
import sinon from "sinon"
import {SynchronousPromise} from "synchronous-promise";

describe('LoadAppForm', () => {
    let subject

    let loadAppsPromise

    let router

    beforeEach(() => {
        loadAppsPromise = SynchronousPromise.unresolved()

        sinon.stub(AppsService, 'loadApplications').returns(loadAppsPromise)

        const localVue = createLocalVue()
        localVue.use(Router)

        router = new Router({
            routes: [
                {
                    name: 'appOverview',
                    path: '/app/:id'
                }
            ]
        })

        subject = mount(LoadAppForm, {
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

    it('does not show the list of apps', () => {
        expect(subject.find('[data-qa=list-of-apps]').exists()).to.be.false
    })

    it('shows the no apps created message', () => {
        expect(subject.find('[data-qa=no-apps-message]').exists()).to.be.true
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

        it('does not show the no apps created message', () => {
            expect(subject.find('[data-qa=no-apps-message]').exists()).to.be.false
        })

        it('renders a list of apps', () => {
            expect(subject.findAll('[data-qa=existing-app]').length).to.equal(2)
        })

        it('renders a link for each app', () => {
            const firstApp = subject.find('[data-qa=existing-app]')
            const linkToApp = firstApp.find('[data-qa=go-to-app]')

            linkToApp.trigger('click')

            const currentRoute = router.history.current;

            expect(currentRoute.name).to.equal('appOverview')
            expect(currentRoute.params).to.deep.equal({
                id: 'c53b3ec2-7528-4534-a260-59b74c0aa75a'
            })

            expect(linkToApp.text()).to.equal('Sample App')
        })
    })
})