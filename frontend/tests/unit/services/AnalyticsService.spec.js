import axios from 'axios'
import sinon from 'sinon'
import {expect} from 'chai'
import {SynchronousPromise} from 'synchronous-promise'
import AnalyticsService from '@/services/AnalyticsService'

describe('AnalyticsService', () => {
    context('loading the hits count', () => {
        let loadHitsCountPromise

        beforeEach(() => {
            loadHitsCountPromise = SynchronousPromise.unresolved()

            sinon.stub(axios, 'get')
                .returns(loadHitsCountPromise)
        })

        afterEach(() => {
            axios.get.restore()
        })

        it('calls the backend', () => {
            AnalyticsService.loadHitsCount('060c3954-560b-11e9-8647-d663bd873d93')

            sinon.assert.calledOnce(axios.get)
            sinon.assert.calledWith(axios.get, 'http://analytics.apps/apps/060c3954-560b-11e9-8647-d663bd873d93/hits')
        })

        context('the data is loaded', () => {
            beforeEach(() => {
                loadHitsCountPromise.resolve({
                    data: {
                        count: 26236
                    }
                })
            })

            it('resolves with the hits count', async () => {
                const data = await AnalyticsService.loadHitsCount('060c3954-560b-11e9-8647-d663bd873d93')

                expect(data).to.deep.equal({
                    count: 26236
                })
            })
        })
    })
})