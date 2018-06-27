import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { mount, shallow } from 'enzyme'
import React from 'react'

import App, { AppBase } from './App'
import configureStore from '../configureStore'

Enzyme.configure({ adapter: new Adapter() })

const makeEvent = (object = {}) => ({
  stopPropagation: () => {},
  preventDefault: () => {},
  ...object,
})

describe('App Component', () => {
  let props
  let wrapper

  beforeEach(() => {
    props = {
      todos: [
        { id: 1, text: 'hello', completed: false },
        { id: 2, text: 'bye', completed: true },
      ],
      dispatchAddTodo: jest.fn(),
    }
    wrapper = shallow(<AppBase {...props} />)
  })

  it('gets todos from state', () => {
    const history = createBrowserHistory()

    const store = configureStore(
      {
        todos: {
          nextId: 3,
          records: [
            { id: 1, text: 'hello', completed: false },
            { id: 2, text: 'bye', completed: true },
          ],
        },
      },
      history,
    )

    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>,
    )

    expect(wrapper.find({ children: 'hello' }).length).toEqual(1)
    expect(wrapper.find({ children: 'bye' }).length).toEqual(1)
  })

  it('shows a list of todos', () => {
    expect(wrapper.find({ children: 'hello' }).length).toEqual(1)
    expect(wrapper.find({ children: 'bye' }).length).toEqual(1)
  })

  it('shows whether or not a todo is complete', () => {
    expect(
      wrapper
        .find('li')
        .at(0)
        .find({ type: 'checkbox' })
        .prop('checked'),
    ).toEqual(false)

    expect(
      wrapper
        .find('li')
        .at(1)
        .find({ type: 'checkbox' })
        .prop('checked'),
    ).toEqual(true)
  })

  it('calls props.dispatchAddTodo when the new todo form is submitted', () => {
    wrapper
      .find('header')
      .find('input')
      .simulate('change', { target: { value: 'hello' } })

    wrapper.update()

    wrapper
      .find('header')
      .find('form')
      .simulate('submit', makeEvent())
    expect(props.dispatchAddTodo).toHaveBeenCalledWith('hello')
  })
})
