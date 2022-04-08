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
    const res = await this.$axios.get(`http://lamobile-api.bikstart.ru/api/catalog/similar/${productId}`)
    commit('setRecommended', res.data)
    console.log(res.data)
  },
  async getSimilarArticles ({ commit }) {
    const res = await this.$axios.get('/similar')
    commit('setSimilarArticles', res.data)
  }
}
