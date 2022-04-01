export const state = () => ({
  title: '',
  parameters: [],
  items: []
})

export const mutations = {
  setCompareTitle (state, array) {
    state.title = array
  },
  setCompareParameters (state, array) {
    state.parameters = array
  },
  setCompareItems (state, array) {
    state.items = array
  }
}

export const actions = {
  async getCompareData ({ commit }) {
    const res = await this.$axios.get('/compare')
    commit('setCompareTitle', res.data.title)
    commit('setCompareParameters', res.data.parameters)
    commit('setCompareItems', res.data.items)
  }
}
