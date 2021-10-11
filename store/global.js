export const state = () => ({
  global: {}
})

export const mutations = {
  setGlobal (state, data) {
    state.global = data
  }
}

export const actions = {
  async getGlobal (ctx) {
    const res = await this.$axios.$get('/global.json')
    ctx.commit('setGlobal', JSON.stringify(res))
  }
}
