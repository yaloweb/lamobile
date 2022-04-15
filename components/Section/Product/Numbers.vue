<template>
  <div class="block-numbers">

    <div
      class="h2"
      v-html="info.title" />

    <div
      v-if="info.elements"
      class="block-numbers-row">

      <div
        v-for="element in info.elements"
        :key="element"
        class="block-numbers-item">

        <div class="block-numbers-item-value">
          {{ element.number }}<span>{{ element.unit }}</span>
        </div>

        <div
          class="block-numbers-item-title"
          v-html="element.text"
        />

      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Numbers',
  props: {
    info: Object
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
