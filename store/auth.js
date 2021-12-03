export const actions = {
  login (ctx, data) {
    this.$axios.post('/auth', {
      login: data.login,
      password: data.password
    })
  }
}
