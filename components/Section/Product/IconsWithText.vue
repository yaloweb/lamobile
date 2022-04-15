<template>
  <div class="icons-with-text">

    <div class="h2">{{ info.title }}</div>

    <div class="icons-with-text-row">

      <div
        v-for="element in info.elements"
        :key="element.id"
        class="icons-with-text-item"
      >
        <div class="icons-with-text-img">
          <img
            :src="element.img"
            alt=""
          >
        </div>
        <div
          class="icons-with-text-title"
          v-html="element.title"
        />
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'IconsWithText',
  props: {
    info: Object
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
