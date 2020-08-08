<template>
  <div>
    ほげ
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Room',
  components: {

  },
  props: {
    sample: {
      type: String,
      default: null
    }
  },
  data () {
    return {
    }
  },
  computed: {

  },
  watch: {

  },
  async mounted () {
    const initData = await this.quickStart()
    console.log(initData)
  },
  methods: {
    ...mapActions({
      quickStart: 'context/quickStart'
    })
  }
}
</script>

<style scoped>
</style>
