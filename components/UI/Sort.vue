<template>
  <div
    class="catalog-sort"
    :class="{'opened': sortOpened}">
    <div
      class="catalog-sort-selected"
      @click="sortOpened = !sortOpened">Сортировать {{ selected.title }} <span><svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.07743 0.731445C6.96869 0.731445 7.41503 1.80901 6.78481 2.43923L4.24828 4.97576C3.8576 5.36644 3.22418 5.36644 2.8335 4.97576L0.296968 2.43923C-0.333246 1.80901 0.113097 0.731446 1.00435 0.731446L6.07743 0.731445Z" fill="#7A7A7A"/></svg></span></div>
    <div class="catalog-sort-dropdown">
      <ul>
        <li
          v-for="(sortItem, idx) in list"
          :key="idx"
          @click="selectSort(sortItem)"
          :class="{'active': selected.code === sortItem.code}">
          {{ sortItem.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sort',
  props: {
    selected: Object,
    list: Array
  },
  data: () => ({
    sortOpened: false
  }),
  methods: {
    selectSort (item) {
      this.sortOpened = false
      this.$emit('select', item)
    },
    clickOutsideSort (e) {
      if (!e.target.closest('.catalog-sort')) {
        this.sortOpened = false
      }
    }
  },
  mounted () {
    document.addEventListener('click', this.clickOutsideSort)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.clickOutsideSort)
  }
}
</script>
