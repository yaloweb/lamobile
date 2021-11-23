import moment from 'moment'

const weekDay = {
  1: 'Понедельник',
  2: 'Вторник',
  3: 'Среда',
  4: 'Четверг',
  5: 'Пятница',
  6: 'Суббота',
  7: 'Воскресенье'
}

export const state = () => ({
  cities: [],
  dates: [],
  times: []
})

export const mutations = {
  setDeliveryData (state, data) {
    state.cities = data.cities
    state.dates = data.dates
    state.dates.forEach(date => {
      const dateMoment = moment(date.value).locale('ru')
      date.value = `${weekDay[dateMoment.isoWeekday()]}, ${dateMoment.format('DD MMMM')}`
    })
    state.times = data.times
  }
}

export const actions = {
  async getDeliveryData ({ commit }) {
    const res = await this.$axios.get('delivery.json')
    commit('setDeliveryData', res.data)
  }
}
