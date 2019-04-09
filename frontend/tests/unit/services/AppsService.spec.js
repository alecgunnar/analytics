import axios from 'axios'
import sinon from 'sinon'
import {SynchronousPromise} from "synchronous-promise";
import {expect} from 'chai'
import AppsService from '@/services/AppsService'

describe('AppsService', () => {
    context('creating an app', () => {
        let createAppPromise

        beforeEach(() => {
            createAppPromise = SynchronousPromise.unresolved()

            sinon.stub(axios, 'post').returns(createAppPromise)
        })

        afterEach(() => {
            axios.post.restore()
        })

        it('posts the data to the backend', () => {
            AppsService.createApplication('sample')

            sinon.assert.calledOnce(axios.post)
            sinon.assert.calledWith(axios.post, 'http://analytics.apps/apps', {
                name: 'sample'
            })
        })

        context('the server responds', () => {
            beforeEach(() => {
                createAppPromise.resolve({
                    data: {
                        status: 'Ok',
                        message: 'Application created',
                        data: {
                            id: 'd36bafd6-ea60-47f6-8626-0abb69422dd0',
                            name: 'sample'
                        }
                    }
                })
            })

            it('resolves with just the id', async () => {
                const id = await AppsService.createApplication('sample')

                expect(id).to.equal('d36bafd6-ea60-47f6-8626-0abb69422dd0')
            })
        })
    })

    context('loading an app', () => {
        let loadAppPromise

        beforeEach(() => {
            loadAppPromise = SynchronousPromise.unresolved()

            sinon.stub(axios, 'get').returns(loadAppPromise)
        })

        afterEach(() => {
            axios.get.restore()
        })

        it('gets the data from the backend', () => {
            AppsService.loadApplication('45133225-c57a-4a48-a1e1-7ee125532c0b')

            sinon.assert.calledOnce(axios.get)
            sinon.assert.calledWith(axios.get, 'http://analytics.apps/apps/45133225-c57a-4a48-a1e1-7ee125532c0b')
        })

        context('the server responds', () => {
            beforeEach(() => {
                loadAppPromise.resolve({
                    data: {
                        id: '45133225-c57a-4a48-a1e1-7ee125532c0b',
                        name: 'sample'
                    }
                })
            })

            it('resolves with just the id', async () => {
                const id = await AppsService.loadApplication('45133225-c57a-4a48-a1e1-7ee125532c0b')

                expect(id).to.deep.equal({
                    id: '45133225-c57a-4a48-a1e1-7ee125532c0b',
                    name: 'sample'
                })
            })
        })
    })

    context('loading all apps', () => {
        let loadAppsPromise

        beforeEach(() => {
            loadAppsPromise = SynchronousPromise.unresolved()

            sinon.stub(axios, 'get').returns(loadAppsPromise)
        })

        afterEach(() => {
            axios.get.restore()
        })

        it('gets the data from the backend', () => {
            AppsService.loadApplications()

            sinon.assert.calledOnce(axios.get)
            sinon.assert.calledWith(axios.get, 'http://analytics.apps/apps')
        })

        context('the server responds', () => {
            beforeEach(() => {
                loadAppsPromise.resolve({
                    data: [
                        {
                            id: '45133225-c57a-4a48-a1e1-7ee125532c0b',
                            name: 'sample'
                        }
                    ]
                })
            })

            it('resolves with just the id', async () => {
                const id = await AppsService.loadApplications()

                expect(id).to.deep.equal([
                    {
                        id: '45133225-c57a-4a48-a1e1-7ee125532c0b',
                        name: 'sample'
                    }
                ])
            })
        })
    })

    context('loading client script', () => {
        let loadClientScriptPromise

        beforeEach(() => {
            loadClientScriptPromise = SynchronousPromise.unresolved()

            sinon.stub(axios, 'get')
                .returns(loadClientScriptPromise)
        })

        afterEach(() => {
            axios.get.restore()
        })

        it('calls the backend', () => {
            AppsService.loadClientScript('6379def0-6127-4b01-a587-e296c3d87b1d')

            sinon.assert.calledOnce(axios.get)
            sinon.assert.calledWith(axios.get, 'http://analytics.apps/apps/6379def0-6127-4b01-a587-e296c3d87b1d/script')
        })

        context('the script is loaded', () => {
            beforeEach(() => {
                loadClientScriptPromise.resolve({
                    data: {
                        script: '<script>alert("Hello World!");</script>'
                    }
                })
            })

            it('responds with the script', async () => {
                const script = await AppsService.loadClientScript('6379def0-6127-4b01-a587-e296c3d87b1d')

                expect(script).to.equal('<script>alert("Hello World!");</script>')
            })
        })
    })
})