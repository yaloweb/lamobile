<template>
  <a
    v-if="isExternal"
    :href="url"
    class="btn"
    target="_blank"
  >
    {{ title }}
  </a>
  <NuxtLink
    v-else
    :to="url"
    class="btn"
  >
    {{ title }}
  </NuxtLink>
</template>

<script>
export default {
  name: 'UIButton',
  props: {
    url: String,
    title: String
  },
  computed: {
    isExternal () {
      return this.url.includes('http')
    }
  }
}
</script>
