export const state = () => ({
  recommendedProducts: []
})

export const mutations = {
  setRecommended (state, array) {
    state.recommendedProducts = array
  }
}

export const actions = {
  async getRecommended ({ commit }, productId) {
    const res = await this.$axios.get(`/natural/catalog/similar/${productId}`)
    commit('setRecommended', res.data)
  }
}
