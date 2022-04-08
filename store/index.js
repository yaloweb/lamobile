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
      dispatch('catalog/getCatalogCategories'),
      dispatch('brands/getBrands'),
      dispatch('basket/getBasketData')
    ])
  },
  async getGlobal ({ commit }) {
    // const res = await this.$axios.$get('/global')
    const res = await this.$axios.$get('http://lamobile-api.bikstart.ru/api/main')
    commit('setGlobal', res)
  }
}
