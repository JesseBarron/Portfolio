import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { expect } from 'chai'
import { spy } from 'sinon'
import { Login, Signup } from '../index'

Enzyme.configure({ adapter: new Adapter() })

const loginWrapper = shallow(<Login />)
const signupWrapper = shallow(<Signup />)


describe('(Component) Login', () => {
    it('renders. . .', () => {
        expect(loginWrapper).to.have.length(1)
    })
    describe('(Component) Signup', () => {
        it('renders. . .', () => {
            expect(signupWrapper).to.have.length(1)
        })
    })
})