<template>
  <v-container
    fluid>
    <mahjong-table/>
    <action-confirm-modal
      @skip="onActionSkip">
    </action-confirm-modal>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
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
      connectionId: state => state.context.connectionId,
      turn: state => state.context.turn,
      firstPlayer: state => state.context.firstPlayer,
      windIndex: state => state.context.windIndex
    }),
    ...mapGetters({
      requiredConfirmAction: 'context/requiredConfirmAction'
    })
  },
  watch: {
    turn (val) {
      console.log(val)
      this.setSkipConfirmAction(false)
      this.executeTurnAction()
    },
    connectionId (val) {
      console.log(val)
      if (!val) {
        return
      }
      this.quickStart()
    }
  },
  mounted () {
  },
  methods: {
    /**
     * @description ダイアログ選択のアクションをスキップした時に実行します。
     * @returns {void}
     */
    onActionSkip () {
      this.setSkipConfirmAction(true)
    },
    /**
     * @description ターンごとのアクションを実行します。
     * @returns {void}
     */
    async executeTurnAction () {
      const turnType = this.getTurnType(this.turn)
      switch (turnType) {
        case StaticModels.TurnType.Self:
          // ツモ
          await this.draw()
          break
        case StaticModels.TurnType.OtherAgency:
          // AIのツモ
          await this.aiDraw()
          // AIの捨牌
          await this.aiDiscard()
          break
        case StaticModels.TurnType.Other:
          break
      }
    },
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
    }),
    ...mapMutations({
      setSkipConfirmAction: 'context/setSkipConfirmAction'
    })
  }
}
</script>

<style scoped>
</style>
