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
    await Promise.all([
      dispatch('getGlobal'),
      dispatch('user/getUserData'),
      dispatch('catalog/getCatalogCategories')
    ])
  },
  async getGlobal ({ commit }) {
    const res = await this.$axios.$get('/global.json')
    commit('setGlobal', res)
  }
}
