import Vue from 'vue'
import Vuex from 'vuex'

const SESSION_KEY = process.env.VUE_APP_SESSION_KEY
const VERSION = process.env.VUE_APP_BUILD_ID

Vue.use(Vuex)

export default new Vuex.Store({
  state: _loadState({
    user: null
  }),
  mutations: {
    setUser (state, { user }) {
      state.user = user
    },
    setNext (state, { next }) {
      state.next = next
    },
    clearNext (state) {
      delete state.next
    }
  },
  actions: { },
  plugins: [
    store => {
      store.subscribe((mutation, state) => _saveState(state))
    }
  ]
})

function _loadState (defaultState = {}) {
  const json = window.sessionStorage.getItem(SESSION_KEY)
  if (!json) {
    return defaultState
  }

  const { version, state } = JSON.parse(json)
  if (version !== VERSION) {
    return defaultState
  }

  return state
}

function _saveState (state) {
  const json = JSON.stringify({ version: VERSION, state })
  window.sessionStorage.setItem(SESSION_KEY, json)
}
