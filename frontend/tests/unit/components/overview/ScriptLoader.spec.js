import {shallowMount} from "@vue/test-utils";
import {expect} from "chai"
import sinon from "sinon"
import {SynchronousPromise} from "synchronous-promise";
import AppsService from '@/services/AppsService'
import ScriptLoader from '@/components/overview/ScriptLoader'

describe('ScriptLoader', () => {
    let subject

    let loadClientScriptPromise

    beforeEach(() => {
        loadClientScriptPromise = SynchronousPromise.unresolved()

        sinon.stub(AppsService, 'loadClientScript')
            .returns(loadClientScriptPromise)

        subject = shallowMount(ScriptLoader, {
            propsData: {
                app: {
                    id: '43ae2eec-5607-11e9-8647-d663bd873d93'
                }
            }
        })
    })

    afterEach(() => {
        AppsService.loadClientScript.restore()
    })

    it('loads hits from the service', () => {
        sinon.assert.calledOnce(AppsService.loadClientScript)
        sinon.assert.calledWith(AppsService.loadClientScript, '43ae2eec-5607-11e9-8647-d663bd873d93')
    })

    context('the hits count is loaded', () => {
        beforeEach(() => {
            sinon.stub(global, 'setTimeout').returns(123098)

            loadClientScriptPromise.resolve('<script>console.log("Hello World!");</script>')
        })

        afterEach(() => {
            setTimeout.restore()
        })

        it('shows the client script', () => {
            expect(subject.find('[data-qa=client-script]').text()).to.equal('<script>console.log("Hello World!");</script>')
        })
    })
})