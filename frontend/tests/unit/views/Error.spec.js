import {shallowMount} from "@vue/test-utils";
import {expect} from "chai"
import Error from '@/views/Error'

describe('Error', () => {
    const mountSubject = (type) => {
        const $route = {
            params: {
                type
            }
        }

        return shallowMount(Error, {
            mocks: {
                $route
            }
        })
    }

    it('shows a generic error message', () => {
        const subject = mountSubject('500')

        expect(subject.find('[data-qa=generic-error]').exists()).to.be.true
    })

    it('shows a not found error message', () => {
        const subject = mountSubject('404')

        expect(subject.find('[data-qa=generic-error]').exists()).to.be.false
        expect(subject.find('[data-qa=not-found-error]').exists()).to.be.true
    })
})