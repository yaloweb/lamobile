<template>
  <div class="chess-img-with-text">

    <SectionProductTitle :info="info"/>

    <div class="chess-img-with-text-container">

      <div
        v-for="element in info.elements"
        :key="element.id"
        class="chess-img-with-text-item"
        :class="element.imgPosition"
        :style="{backgroundColor: colorFixDoubleHash(element.background)}">
        <div class="chess-img-with-text-item-img">
          <img
            v-if="element.img"
            :src="element.img"
            alt=""
          >
        </div>
        <div
          class="chess-img-with-text-item-text"
          :style="{'color': colorFixDoubleHash(element.textColor)}">
          <div
            v-if="element.title"
            class="h2"
            v-html="element.title"
          />
          <p
            v-if="element.description"
            v-html="element.description"
          />
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'ChessImgWithText',
  props: {
    info: Object
  },
  methods: {
    colorFixDoubleHash (color) {
      // Иногда с бэка прилетают по несколько хэшей
      if (typeof color === 'string') {
        return color.replace('##', '#')
      }
    }
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
