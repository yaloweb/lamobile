<template>
  <div class="form-group">
    <label
      v-if="label"
      class="form-label">{{label}}</label>
    <div class="form-input">
      <label class="upload-file">
        <input
          type="file"
          @change="change">
        <span
          class="upload-file-preview"
          :style="{backgroundImage: previewImage}">
          <span>
            Загрузить
          </span>
        </span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormUpload',
  props: {
    label: String
  },
  data: () => ({
    loadedPreview: ''
  }),
  computed: {
    previewImage () {
      return this.loadedPreview ? (this.loadedPreview.length > 0 ? `url(${this.loadedPreview})` : null) : null
    }
  },
  methods: {
    async change (event) {
      const target = event.target
      const file = target.files[0]
      if (/\.(jpe?g|png)$/i.test(file.name)) {
        this.loadedPreview = await this.blobToBase64(file)
        this.$emit('change', file)
      } else {
        target.value = null
        alert('Выберите файл в формате png или jpeg')
      }
    },
    blobToBase64 (file) {
      return new Promise(resolve => {
        let reader = new FileReader()
        reader.addEventListener('load', event => resolve(event.currentTarget.result))
        reader.readAsDataURL(file)
      })
    }
  }
  // async mounted () {
  //   if (this.value !== '') {
  //     this.loadedPreview = await this.blobToBase64(this.value)
  //   }
  // }
}
</script>

<style scoped>

</style>
