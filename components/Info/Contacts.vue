<template>
  <div class="contacts">
    <div class="contacts"/>
    <div
      v-for="(contact, index) in contacts"
      :key="index"
      class="contacts-item"
      v-html="contact"/>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Contacts',
  computed: {
    ...mapState({
      contacts: state => state.forUsers.contacts
    })
  }
}
</script>
