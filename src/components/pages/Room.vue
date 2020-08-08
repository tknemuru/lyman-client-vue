<template>
  <v-container
    fluid>
    <mahjong-table/>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import MahjongTable from '@/components/templates/MahjongTable'

/**
 * @description ルーム
 */
export default {
  name: 'Room',
  components: {
    MahjongTable
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
