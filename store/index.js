export const state = () => ({
  global: {}
})

export const mutations = {
  setGlobal (state, data) {
    state.global = data
  }
}

export const actions = {
  async nuxtServerInit ({ dispatch }) {
    await dispatch('getGlobal')
    await dispatch('user/getUserData')
  },
  async getGlobal ({ commit }) {
    const res = await this.$axios.$get('/global.json')
    commit('setGlobal', res)
  }
}
