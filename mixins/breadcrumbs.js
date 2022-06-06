export default {
  methods: {
    setBreadcrumbs () {
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
  mounted () {
    this.setBreadcrumbs()
  }
}
