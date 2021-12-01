<template>
  <div class="for-users-page">

    <UIBreadcrumbs/>

    <section class="s-for-users">
      <div class="container">

        <div class="page-title">
          <h1>Пользователям</h1>
        </div>

        <div class="accordion">

          <AccordionItem
            :opened="accordionOpened === 1"
            @toggle="toggle($event, 1)">
            <template v-slot:header>Гарантии</template>
            <template v-slot:body>
              <InfoGuarantee/>
            </template>
          </AccordionItem>

        </div>

      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'for-users',
  data: () => ({
    accordionOpened: 0
  }),
  methods: {
    toggle (bool, id) {
      this.accordionOpened = bool ? 0 : id
    }
  }
}
</script>

<style scoped>

</style>
