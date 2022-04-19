export const state = () => ({
  blogMain: [],
  blog: [],
  categories: []
})

export const mutations = {
  setBlog (state, data) {
    state.blog = data
  },
  setBlogMain (state, data) {
    state.blogMain = []
    state.blogMain = data
  },
  setLoadedBlogItems (state, items) {
    state.blog.push(...items)
  },
  setCategories (state, data) {
    state.categories = data
  }
}

export const actions = {
  async getBlog ({ commit }) {
    // const res = await this.$axios.get('/blog/blog-all')
    const res = await this.$axios.get('/natural/blog/article')
    commit('setBlog', res.data)
  },
  async getBlogMain ({ commit }) {
    const res = await this.$axios.get('/natural/blog/article?main=y')
    commit('setBlogMain', res.data)
  },
  async loadBlog ({ commit }, params) {
    const res = await this.$axios.get('/natural/blog/article', {
      params
    })
    commit('setLoadedBlogItems', res.data)
  },
  async getBlogListByParams ({ commit }, params) {
    const res = await this.$axios.get('/natural/blog/article', {
      params
    })
    commit('setBlog', res.data)
  },
  async getCategories ({ commit }) {
    // const res = await this.$axios.get('/blog/categories')
    const res = await this.$axios.get('/natural/blog/category')
    commit('setCategories', res.data)
  }
}
