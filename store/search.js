export const state = () => ({
  results: {
    products: [],
    categories: [],
    accessories: []
  }
})

export const mutations = {
  setSearchResults (state, data) {
    state.results.products = data.products
    state.results.categories = data.categories
    state.results.accessories = data.accessories
  },
  clearSearchResults (state, data) {
    state.results.products = []
    state.results.categories = []
    state.results.accessories = []
  }
}

export const actions = {
  async getSearchResults ({ commit }, query) {
    commit('clearSearchResults')
    if (query.length > 1) {
      const res = await this.$axios.get('/natural/catalog/search', {
        params: {
          query
        }
      })
      commit('setSearchResults', res.data)
    }
  }
}
