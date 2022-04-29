export const actions = {
  async submitOrder ({ dispatch }, data) {
    await this.$axios({
      method: 'post',
      url: '/natural/order/send',
      data
    }).then(response => {
      if (response.data.result === 'success') {
        dispatch('alert/openAlert', 'Заказ успешно создан', { root: true })
      }
    })
  }
}
