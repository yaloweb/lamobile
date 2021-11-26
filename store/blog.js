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
    let row = [[], [], []]
    let i = 1
    data.forEach(item => {
      row[i - 1].push(item)
      i === 3 ? i = 1 : i++
    })
    state.blogMain = row
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
  }
}
