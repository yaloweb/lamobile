<script>
export default {
  name: 'brands',
  middleware ({ redirect }) {
    return redirect('/catalog')
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
