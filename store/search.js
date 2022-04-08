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
  }
}

export const actions = {
  async getSearchResults ({ commit }, query) {
    const res = await this.$axios.get('http://lamobile-api.bikstart.ru/api/catalog/search', {
      params: {
        query
      }
    })
    commit('setSearchResults', res.data)
  }
}
