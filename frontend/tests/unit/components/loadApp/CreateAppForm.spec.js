import CreateAppForm from '@/components/loadApp/CreateAppForm'
import AppsService from "@/services/AppsService"
import {shallowMount} from "@vue/test-utils";
import {expect} from "chai"
import sinon from "sinon"
import {SynchronousPromise} from "synchronous-promise";

describe('CreateAppForm', () => {
    let subject

    beforeEach(() => {
        subject = shallowMount(CreateAppForm)
    })

    it('has an input field for the app name', () => {
        expect(subject.find('input[data-qa=new-app-name-input]').exists()).to.be.true
    })

    it('has a submit button', () => {
        expect(subject.find('button[data-qa=create-app-submit-button]').exists()).to.be.true
    })

    it('the submit button is disabled', () => {
        const button = subject.find('[data-qa=create-app-submit-button]');

        expect(button.attributes().disabled).to.equal('disabled')
    })

    context('a name is entered', () => {
        beforeEach(() => {
            subject.find('[data-qa=new-app-name-input]').setValue('Sample App Name')
        })

        it('the submit button is not disabled', () => {
            const button = subject.find('[data-qa=create-app-submit-button]')
            expect(button.attributes().disabled).to.be.undefined
        })

        context('the name is submitted', () => {
            let submitEvent

            let createAppPromise

            beforeEach(() => {
                submitEvent = new Event('submit')
                sinon.spy(submitEvent, 'preventDefault')

                createAppPromise = SynchronousPromise.unresolved()

                sinon.stub(AppsService, 'createApplication')
                    .returns(createAppPromise)

                const form = subject.find('[data-qa=create-app-form]')

                form.element.dispatchEvent(submitEvent)
            })

            afterEach(() => {
                AppsService.createApplication.restore()
            })

            it('prevents the default submit behavior', () => {
                sinon.assert.calledOnce(submitEvent.preventDefault)
            })

            it('calls the service with the app name', () => {
                sinon.assert.calledOnce(AppsService.createApplication)
                sinon.assert.calledWith(AppsService.createApplication, 'Sample App Name')
            })

            context('the app is created', () => {
                beforeEach(() => {
                    createAppPromise.resolve('440d0fed-9b2e-422b-b754-c101ec4291c4')
                })

                it('clears the entered app name value', () => {
                    const input = subject.find('[data-qa=new-app-name-input]')

                    expect(input.element.value).to.be.empty;
                })

                it('emits the id returned by the service', () => {
                    const emits = subject.emitted().created;

                    expect(emits).to.not.be.undefined
                    expect(emits[0][0]).to.equal('440d0fed-9b2e-422b-b754-c101ec4291c4')
                })
            })
        })
    })
})