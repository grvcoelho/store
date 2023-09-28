import { produce, Draft } from 'immer'

type Listener<T> = (state: T) => void

type Store<T> = {
  state: T
  getState: () => T
  setState: (fn: (prev: Draft<T>) => void) => void
  subscribe: (listener: Listener<T>) => () => void
}

export const createStore = <T>(initialState: T): Store<T> => {
  let state: T = initialState
  const listeners = new Set<Listener<T>>()

  return {
    state,

    getState() {
      return state
    },

    setState(fn: (prev: Draft<T>) => void) {
      state = produce(state, (draft) => {
        return fn(draft)
      })

      listeners.forEach((listener) => listener(state))
    },

    subscribe(listener: Listener<T>) {
      listeners.add(listener)

      return () => {
        listeners.delete(listener)
      }
    },
  }
}
