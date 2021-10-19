export const state = () => ({
  visibleFilter: false,
  brands: [
    {
      id: 1,
      title: 'Roborock'
    },
    {
      id: 2,
      title: 'Yeelight'
    },
    {
      id: 3,
      title: '70mai'
    },
    {
      id: 4,
      title: 'ZMI'
    },
    {
      id: 5,
      title: '1More'
    },
    {
      id: 6,
      title: 'WalkingPad'
    },
    {
      id: 7,
      title: 'Mi'
    }
  ],
  categories: [
    {
      id: 1,
      title: 'Аксессуары для роботов-пылесосов',
      selected: false
    },
    {
      id: 2,
      title: 'Свет',
      selected: false,
      subcategories: [
        {
          id: 1,
          title: 'Диодные ленты',
          selected: false
        },
        {
          id: 2,
          title: 'Настольные лампы',
          selected: false
        },
        {
          id: 3,
          title: 'Ночники',
          selected: false
        },
        {
          id: 4,
          title: 'Потолочные светильники',
          selected: false
        },
        {
          id: 5,
          title: 'Цокольные лампы',
          selected: false
        }
      ]
    },
    {
      id: 3,
      title: 'Климат',
      selected: false
    },
    {
      id: 4,
      title: 'Внешние аккумуляторы',
      selected: false
    },
    {
      id: 5,
      title: 'Аксессуары в авто',
      selected: false
    },
    {
      id: 6,
      title: 'Беговые дорожки',
      selected: false
    }
  ],
  selectedBrands: [],
  categoriesAll: false
})

export const mutations = {
  setFilterState (state, bool) {
    state.visibleFilter = bool
  },
  addSelectedBrand (state, item) {
    if (state.selectedBrands.filter(arrItem => arrItem === item.id).length === 0) {
      state.selectedBrands.push(item.id)
    }
  },
  addAllBrand (state) {
    state.selectedBrands = state.brands.map(item => item.id)
  },
  removeSelectedBrand (state, id) {
    state.selectedBrands = state.selectedBrands.filter(arrItem => arrItem !== id)
  },
  toggleAllCategories (state, value) {
    state.categoriesAll = value
  },
  selectCategory (state, data) {
    state.categories.filter(item => item.id === data.id)[0].selected = data.value
  },
  selectSubCategory (state, data) {
    const parent = state.categories.filter(item => item.id === data.parentId)[0]
    parent.subcategories.filter(item => item.id === data.id)[0].selected = data.value
  }
}

export const actions = {
  selectAllCategories ({ commit, state }, value) {
    console.log(value)
    commit('toggleAllCategories', value)
    const res = !!state.categoriesAll
    state.categories.forEach(category => {
      commit('selectCategory', {
        id: category.id,
        value: res
      })
      if (category.subcategories) {
        category.subcategories.forEach(subcategory => {
          commit('selectSubCategory', {
            id: subcategory.id,
            parentId: category.id,
            value: res
          })
        })
      }
    })
  }
}
