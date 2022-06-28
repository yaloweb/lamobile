export default {
  methods: {
    setBreadcrumbs () {
      console.log(this.breadcrumbs)
      if (this.breadcrumbs) {
        this.$store.commit('breadcrumbs/setBreadcrumbs', JSON.parse(JSON.stringify(this.breadcrumbs)))
      }
    }
  },
  watch: {
    breadcrumbs () {
      this.setBreadcrumbs()
    }
  },
  created () {
    this.setBreadcrumbs()
  }
}
