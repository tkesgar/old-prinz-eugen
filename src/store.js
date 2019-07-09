import Vue from 'vue'
import Vuex from 'vuex'

const SESSION_KEY = process.env.VUE_APP_SESSION_KEY
const VERSION = process.env.VUE_APP_COMMIT

function loadState (defaultState = {}) {
  if (!sessionStorage) {
    return defaultState
  }

  const json = sessionStorage.getItem(SESSION_KEY)
  if (!json) {
    return defaultState
  }

  const { version, state } = JSON.parse(json)
  if (version !== VERSION) {
    return defaultState
  }

  return state
}

function saveState (state) {
  if (!sessionStorage) {
    return
  }

  const json = JSON.stringify({ version: VERSION, state })
  sessionStorage.setItem(SESSION_KEY, json)
}

Vue.use(Vuex)

const store = new Vuex.Store({
  state: loadState({
    user: null,
    next: null
  }),
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setNext (state, next) {
      state.next = next
    }
  },
  plugins: [
    store => store.subscribe((mutation, state) => saveState(state))
  ]
})

export function getUser () {
  return store.state.user
}

export default store
