export const state = () => ({
  global: {
    header: {
      catalogMenu: []
    },
    footer: {
      contacts: ''
    }
  }
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
      dispatch('catalog/getCatalogCategories'),
      dispatch('brands/getBrands'),
      dispatch('basket/getBasketData')
    ])
  },
  async getGlobal ({ commit }) {
    const res = await this.$axios.$get('/natural/main')
    commit('setGlobal', res)
  }
}
