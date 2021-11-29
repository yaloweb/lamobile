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
    const res = await this.$axios.get('/blog/blog-all.json')
    commit('setBlog', res.data)
  },
  async getBlogMain ({ commit }) {
    const res = await this.$axios.get('/blog/blog-main.json')
    commit('setBlogMain', res.data)
  },
  async loadBlog ({ commit, state }) {
    if (state.blog.length < 44) {
      const res = await this.$axios.get('/blog/blog-all.json')
      commit('setLoadedBlogItems', res.data)
    }
  },
  async filterBlogByCategory ({ commit }, id) {
    const res = await this.$axios.get('/blog/blog-all.json')
    commit('setBlog', res.data)
  },
  async getCategories ({ commit }) {
    const res = await this.$axios.get('/blog/categories.json')
    commit('setCategories', res.data)
  }
}
