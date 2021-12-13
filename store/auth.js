export const state = () => ({
  login: {
    email: '',
    password: ''
  },
  registration: {
    email: '',
    password: '',
    repeatPassword: '',
    contactPerson: {
      name: '',
      phone: '',
      email: '',
      individual: true
    },
    company: {
      user: {
        name: '',
        surname: '',
        email: '',
        phone: '',
        individual: true
      },
      name: '',
      inn: '',
      address: '',
      additionalPhone: '',
      site: '',
      logo: '',
      contactPersons: [
        {
          name: '',
          surname: '',
          email: '',
          phone: ''
        }
      ]
    }
  }
})

export const mutations = {
  setLoginData (state, data) {
    state.login[data.field] = data.value
  },
  setRegStep1 (state, data) {
    state.registration.email = data.email
    state.registration.password = data.password
    state.registration.repeatPassword = data.repeatPassword
  },
  setRegStep2 (state, data) {
    state.registration.contactPerson.name = data.name
    state.registration.contactPerson.phone = data.phone
    state.registration.contactPerson.email = data.email
    state.registration.contactPerson.individual = data.individual
  }
}
