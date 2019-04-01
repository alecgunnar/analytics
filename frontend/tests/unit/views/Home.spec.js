import Home from '@/views/Home'
import CreateAppForm from '@/components/createApp/CreateAppForm'
import {shallowMount, createLocalVue} from "@vue/test-utils";
import Router from "vue-router"
import {expect} from "chai"
import sinon from "sinon"

describe('CreateAppForm', () => {
    let router

    let subject

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Router)

        router = new Router()

        subject = shallowMount(Home, {
            localVue,
            router
        })
    })

    it('has a create app form', () => {
        expect(subject.find(CreateAppForm).exists()).to.be.true
    })

    context('an app is created', () => {
        beforeEach(() => {
            sinon.stub(router, 'push')

            subject.find(CreateAppForm).vm.$emit('created', 'c3e83b52-84d1-4f70-8137-fcc270752aec')
        })

        afterEach(() => {
            router.push.restore()
        })

        it('sends the user to the app', () => {
            sinon.assert.calledOnce(router.push)
            sinon.assert.calledWith(router.push, {name: 'appOverview', params: {id: 'c3e83b52-84d1-4f70-8137-fcc270752aec'}})
        })
    })
})