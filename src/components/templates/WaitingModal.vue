<template>
  <v-dialog
    :value="active"
    persistent>
    <div>入室待ち中です…</div>
  </v-dialog>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import StaticModels from '@/StaticModels'

/**
 * @description 入室完了待ちモーダル
 */
export default {
  name: 'WaitingModal',
  components: {
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    /**
     * @description 静的モデル群
     */
    StaticModels: () => StaticModels,
    /**
     * @description ダイアログを表示するかどうか
     */
    active () {
      return this.roomState === this.StaticModels.RoomState.Entering
    },
    ...mapState({
      roomState: state => state.context.roomState
    }),
    ...mapGetters({
    })
  },
  watch: {

  },
  mounted () {
  },
  methods: {
    ...mapActions({
    })
  }
}
</script>

<style scoped>
</style>
