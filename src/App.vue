<template>
  <v-app>
    <router-view/>
    <notify-snackbar/>
  </v-app>
</template>

<script>
import NotifySnackbar from '@/components/templates/NotifySnackbar'

/**
 * @description App
 */
export default {
  components: {
    NotifySnackbar
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style>
html {
 touch-action: manipulation;
}
body {
 -webkit-touch-callout:none;
 -webkit-user-select:none;
}
</style>
