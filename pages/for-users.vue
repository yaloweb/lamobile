<template>
  <div class="for-users-page">

    <UIBreadcrumbs/>

    <section class="s-for-users">
      <div class="container">

        <div class="page-title">
          <h1>Пользователям</h1>
        </div>

        <div
          class="accordion"
          :class="{'active': accordionOpened.length !== 0}">

          <AccordionItem
            :opened="accordionOpened.indexOf(1) !== -1"
            @toggle="toggle($event, 1)">
            <template v-slot:header>Гарантии</template>
            <template v-slot:body>
              <InfoGuarantee/>
            </template>
          </AccordionItem>

          <AccordionItem
            :opened="accordionOpened.indexOf(2) !== -1"
            @toggle="toggle($event, 2)">
            <template v-slot:header>Оплата и доставка</template>
            <template v-slot:body>
              <InfoPaymentAndDelivery />
            </template>
          </AccordionItem>

          <AccordionItem
            :opened="accordionOpened.indexOf(3) !== -1"
            @toggle="toggle($event, 3)">
            <template v-slot:header>Условия продажи</template>
            <template v-slot:body>
              <InfoTermsOfSale />
            </template>
          </AccordionItem>

          <AccordionItem
            :opened="accordionOpened.indexOf(4) !== -1"
            @toggle="toggle($event, 4)">
            <template v-slot:header>Обмен и возврат товара</template>
            <template v-slot:body>
              <InfoExchange />
            </template>
          </AccordionItem>

          <AccordionItem
            :opened="accordionOpened.indexOf(5) !== -1"
            @toggle="toggle($event, 5)">
            <template v-slot:header>Контакты</template>
            <template v-slot:body>
              <InfoContacts />
            </template>
          </AccordionItem>

        </div>

      </div>
    </section>

  </div>
</template>

<script>
export default {
  async fetch () {
    return await this.$store.dispatch('forUsers/getInfoForUsers')
  },
  name: 'for-users',
  data: () => ({
    accordionOpened: []
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
