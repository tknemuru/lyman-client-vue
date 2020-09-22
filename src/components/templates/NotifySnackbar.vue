<template>
  <v-snackbar
    v-model="active"
    color="info"
    right
    timeout="2000">
    <div>{{ message }}</div>
  </v-snackbar>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import StaticModels from '@/StaticModels'

/**
 * @description 通知スナックバー
 */
export default {
  components: {
  },
  props: {
  },
  data () {
    return {
      active: false,
      message: null
    }
  },
  computed: {
    /**
     * @description 静的モデル群
     */
    StaticModels: () => StaticModels,
    ...mapState({
    }),
    ...mapGetters({
    })
  },
  watch: {
    message (val) {
      if (val) {
        this.active = true
      }
    }
  },
  created () {
    window.snackbar = this
  },
  mounted () {
  },
  methods: {
    /**
     * @description スナックバーを表示します。
     */
    open (message) {
      this.message = message
    },
    ...mapActions({
    })
  }
}
</script>

<style scoped>
</style>
