export const state = () => ({
  recommendedProducts: []
})

export const mutations = {
  setRecommended (state, data) {
    state.recommendedProducts = data
  }
}

export const actions = {
  async getRecommended ({ commit }, productId) {
    const res = await this.$axios.get(`/catalog/similar/${productId}`)
    commit('setRecommended', res.data)
  }
}
