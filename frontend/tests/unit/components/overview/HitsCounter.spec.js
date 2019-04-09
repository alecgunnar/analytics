import {shallowMount} from "@vue/test-utils";
import {expect} from "chai"
import sinon from "sinon"
import {SynchronousPromise} from "synchronous-promise";
import AnalyticsService from '@/services/AnalyticsService'
import HitsCounter from '@/components/overview/HitsCounter'

describe('HitsCounter', () => {
    let subject

    let loadHitsCountPromise

    beforeEach(() => {
        loadHitsCountPromise = SynchronousPromise.unresolved()

        sinon.stub(AnalyticsService, 'loadHitsCount')
            .returns(loadHitsCountPromise)

        subject = shallowMount(HitsCounter, {
            propsData: {
                app: {
                    id: '43ae2eec-5607-11e9-8647-d663bd873d93'
                }
            }
        })
    })

    afterEach(() => {
        AnalyticsService.loadHitsCount.restore()
    })

    it('defaults the hit counter to zero', () => {
        expect(subject.find('[data-qa=hits-count]').text()).to.equal('0')
    })

    it('defaults to the no tags message', () => {
        expect(subject.find('[data-qa=pages-list]').exists()).to.be.false
        expect(subject.find('[data-qa=no-pages-message]').exists()).to.be.true
    })

    it('loads hits from the service', () => {
        sinon.assert.calledOnce(AnalyticsService.loadHitsCount)
        sinon.assert.calledWith(AnalyticsService.loadHitsCount, '43ae2eec-5607-11e9-8647-d663bd873d93')
    })

    context('the hits count is loaded', () => {
        beforeEach(() => {
            sinon.stub(global, 'setTimeout').returns(123098)

            loadHitsCountPromise.resolve({
                count: 123,
                pages: [
                    {
                        url: 'http://www.sample.com',
                        count: 115
                    },
                    {
                        url: 'http://www.sample.com/buy-now',
                        count: 8
                    }
                ]
            })
        })

        afterEach(() => {
            setTimeout.restore()
        })

        it('shows the number of hits', () => {
            expect(subject.find('[data-qa=hits-count]').text()).to.equal('123')
        })

        it('shows the pages that were hit', () => {
            expect(subject.find('[data-qa=pages-list]').exists()).to.be.true
            expect(subject.find('[data-qa=no-pages-message]').exists()).to.be.false

            const listedPages = subject.findAll('[data-qa=listed-page]');

            expect(listedPages.length).to.equal(2)
            expect(listedPages.at(0).text()).to.equal('http://www.sample.com 115')
        })

        it('schedules an interval to check for hits', () => {
            sinon.assert.calledOnce(setTimeout)
            sinon.assert.calledWith(setTimeout, sinon.match.func, sinon.match.number)
        })

        context('the interval callback is run', () => {
            let reloadHitsPromise

            beforeEach(() => {
                AnalyticsService.loadHitsCount.resetHistory()

                reloadHitsPromise = SynchronousPromise.unresolved()

                AnalyticsService.loadHitsCount
                    .returns(reloadHitsPromise)

                const intervalCallback = setTimeout.getCall(0).args[0]
                intervalCallback()
            })

            it('loads hits from the service', () => {
                sinon.assert.calledOnce(AnalyticsService.loadHitsCount)
                sinon.assert.calledWith(AnalyticsService.loadHitsCount, '43ae2eec-5607-11e9-8647-d663bd873d93')
            })

            context('the hits count is loaded', () => {
                beforeEach(() => {
                    reloadHitsPromise.resolve({
                        count: 456,
                        pages: []
                    })
                })

                it('shows the updated number of hits', () => {
                    expect(subject.find('[data-qa=hits-count]').text()).to.equal('456')
                })
            })
        })

        context('the component is unmounted', () => {
            it('clears the timeout', () => {
                sinon.stub(global, 'clearTimeout')

                subject.destroy()

                sinon.assert.calledOnce(clearTimeout)
                sinon.assert.calledWith(clearTimeout, 123098)

                clearTimeout.restore()
            })
        })
    })
})