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
    // const res = await this.$axios.get('/blog/blog-all.json')
    const res = await this.$axios.get('http://lamobile-api.bikstart.ru/api/blog/article')
    commit('setBlog', res.data)
  },
  async getBlogMain ({ commit }) {
    const res = await this.$axios.get('http://lamobile-api.bikstart.ru/api/blog/article?main=y')
    commit('setBlogMain', res.data)
  },
  async loadBlog ({ commit }, params) {
    const res = await this.$axios.get('http://lamobile-api.bikstart.ru/api/blog/article', {
      params
    })
    commit('setLoadedBlogItems', res.data)
  },
  async filterBlogByCategory ({ commit }, id) {
    const res = await this.$axios.get(`http://lamobile-api.bikstart.ru/api/blog/article?category=${id}`)
    commit('setBlog', res.data)
  },
  async getCategories ({ commit }) {
    // const res = await this.$axios.get('/blog/categories.json')
    const res = await this.$axios.get('http://lamobile-api.bikstart.ru/api/blog/category')
    commit('setCategories', res.data)
  }
}
