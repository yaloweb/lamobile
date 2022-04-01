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
    for (let key in data) {
      state[key] = data[key]
    }
  }
}

export const actions = {
  async getPostData ({ commit }, id) {
    // const res = await this.$axios.get(`http://lamobile-api.bikstart.ru/api/blog/article/${id}`)
    const res = await this.$axios.get('/blog/post/umnye-avto-aksessursy')
    commit('setPostData', res.data)
  }
}
