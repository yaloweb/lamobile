export const state = () => ({
  banner: '',
  mobBanner: '',
  createdAt: '',
  category: '',
  views: 0,
  title: '',
  descr: '',
  content: '',
  similar: []
})

export const mutations = {
  setPostData (state, data) {
    state.banner = data.banner
    state.mobBanner = data.mobBanner
    state.createdAt = data.createdAt
    state.category = data.category
    state.views = data.views
    state.title = data.title
    state.descr = data.descr
    state.content = data.content
    state.similar = data.similar
  }
}

export const actions = {
  async getPostData ({ commit }, symbol) {
    const res = await this.$axios.get(`/blog/posts/${symbol}.json`)
    commit('setPostData', res.data)
  }
}
