<template>
  <div class="page-title page-title-with-back-link">

    <div class="page-back-link">
      <a href="#" @click.prevent="$router.go(-1)">
        <span class="icon-angle-left-light"/>
      </a>
    </div>

    <h1>{{ title }}</h1>

  </div>
</template>

<script>
export default {
  name: 'UIPageTitle',
  props: {
    title: String
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
