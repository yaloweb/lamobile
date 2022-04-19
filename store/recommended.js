export const state = () => ({
  recommendedProducts: [],
  similarArticles: []
})

export const mutations = {
  setRecommended (state, array) {
    state.recommendedProducts = array
  },
  setSimilarArticles (state, array) {
    state.similarArticles = array
  }
}

export const actions = {
  async getRecommended ({ commit }, productId) {
    const res = await this.$axios.get(`/natural/catalog/similar/${productId}`)
    commit('setRecommended', res.data)
  },
  async getSimilarArticles ({ commit }) {
    const res = await this.$axios.get('/similar')
    commit('setSimilarArticles', res.data)
  }
}
