<template>
  <v-container
    fluid>
    <mahjong-table/>
    <action-confirm-modal/>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import MahjongTable from '@/components/templates/MahjongTable'
import ActionConfirmModal from '@/components/organisms/ActionConfirmModal'
import StaticModels from '@/StaticModels'

/**
 * @description ルーム
 */
export default {
  name: 'Room',
  components: {
    MahjongTable,
    ActionConfirmModal
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
    ...mapState({
      turn: state => state.context.turn,
      firstPlayer: state => state.context.firstPlayer,
      windIndex: state => state.context.windIndex
    }),
    ...mapGetters({
    })
  },
  watch: {
    async turn (val) {
      console.log(val)
      const turnType = this.getTurnType(val)
      switch (turnType) {
        case StaticModels.TurnType.Self:
          // ツモ
          await this.draw()
          // ルーム情報を最新に更新
          await this.reflesh()
          break
        case StaticModels.TurnType.OtherAgency:
          // AIのツモ
          await this.aiDraw()
          // AIの捨牌
          await this.aiDiscard()
          // ルーム情報を最新に更新
          await this.reflesh()
          break
      }
    }
  },
  mounted () {
    this.quickStart()
  },
  methods: {
    /**
     * ターン種別を取得します。
     */
    getTurnType (turn) {
      let type
      if (this.turn === this.windIndex) {
        type = StaticModels.TurnType.Self
      } else if (this.firstPlayer) {
        type = StaticModels.TurnType.OtherAgency
      } else {
        type = StaticModels.TurnType.Other
      }
      return type
    },
    ...mapActions({
      aiDiscard: 'context/aiDiscard',
      aiDraw: 'context/aiDraw',
      draw: 'context/draw',
      quickStart: 'context/quickStart',
      reflesh: 'context/reflesh'
    })
  }
}
</script>

<style scoped>
</style>
