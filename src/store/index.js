import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: 'aaa',
    nextId: 5,
    viewkey: 'all'
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    setInputValue (state, value) {
      state.inputValue = value
    },
    addItem (state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    removedItem (state, id) {
      const i = state.list.findIndex(x => x.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    changeStatus (state, param) {
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    cleanDone (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    changeViewKey (state, key) {
      state.viewkey = key
    }
  },
  getters: {
    list: state => state.list,
    unDoneLength (state) {
      return state.list.filter(x => x.done === false).length
    },
    infolist (state) {
      if (state.viewkey === 'all') {
        return state.list
      }
      if (state.viewkey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewkey === 'done') {
        return state.list.filter(x => x.done)
      }
    }
  },
  actions: {
    getList (context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit('initList', data)
      })
    }
  },
  modules: {
  }
})
