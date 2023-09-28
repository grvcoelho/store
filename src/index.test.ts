import { createStore } from './index'

test('getState', () => {
  const store = createStore('Jane Doe')

  expect(store.getState()).toBe('Jane Doe')
})

test('setState', () => {
  const store = createStore({
    name: 'Jane Doe',
    age: 42,
    animals: ['cat', 'dog'],
    preferences: {
      vegetarian: false,
    },
  })

  store.setState((draft) => {
    draft.age = 43
    draft.preferences.vegetarian = true
  })

  expect(store.getState()).toEqual({
    name: 'Jane Doe',
    age: 43,
    animals: ['cat', 'dog'],
    preferences: {
      vegetarian: true,
    },
  })
})

test('subscribe', () => {
  const store = createStore('Jane Doe')

  const listener = jest.fn()

  store.subscribe(listener)

  store.setState((draft) => {
    draft = 'John Doe'
    return draft
  })

  expect(listener).toHaveBeenCalledTimes(1)
  expect(listener).toHaveBeenCalledWith('John Doe')
})

test('unsubscribe', () => {
  const store = createStore('Jane Doe')

  const listener = jest.fn()

  const unsubscribe = store.subscribe(listener)

  store.setState((draft) => {
    draft = 'John Doe'
    return draft
  })

  expect(listener).toHaveBeenCalledTimes(1)
  expect(listener).toHaveBeenCalledWith('John Doe')

  unsubscribe()

  store.setState((draft) => {
    draft = 'Jane Doe'
    return draft
  })

  expect(listener).toHaveBeenCalledTimes(1)
  expect(listener).toHaveBeenCalledWith('John Doe')
})
