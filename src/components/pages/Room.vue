<template>
  <v-container
    fluid>
    <mahjong-table/>
    <room-select-modal/>
    <waiting-modal/>
    <action-confirm-modal
      @skip="onActionSkip">
    </action-confirm-modal>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import ActionConfirmModal from '@/components/organisms/ActionConfirmModal'
import MahjongTable from '@/components/templates/MahjongTable'
import RoomSelectModal from '@/components/organisms/RoomSelectModal'
import StaticModels from '@/StaticModels'
import WaitingModal from '@/components/templates/WaitingModal'

/**
 * @description ルーム
 */
export default {
  name: 'Room',
  components: {
    ActionConfirmModal,
    MahjongTable,
    RoomSelectModal,
    WaitingModal
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
      roomState: state => state.context.roomState,
      turn: state => state.context.turn
    }),
    ...mapGetters({
      turnType: 'context/getTurnType',
      requiredConfirmAction: 'context/requiredConfirmAction'
    })
  },
  watch: {
    turn (val) {
      console.log(val)
      if (this.roomState !== StaticModels.RoomState.Dealted) {
        return
      }
      this.setSkipConfirmAction(false)
      this.executeTurnAction()
    },
    connectionId (val) {
      console.log(val)
      if (!val) {
        return
      }
      if (this.$route.query.q) {
        this.quickStart()
      }
    },
    roomState (val) {
      console.log(val)
      if (this.$route.query.q) {
        return
      }
      switch (val) {
        case StaticModels.RoomState.Entered:
          this.dealtTiles()
          break
        case StaticModels.RoomState.Dealted:
          this.setSkipConfirmAction(false)
          this.executeTurnAction()
          break
        default:
          break
      }
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
      console.log(this.turnType)
      switch (this.turnType) {
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
    ...mapActions({
      aiDiscard: 'context/aiDiscard',
      aiDraw: 'context/aiDraw',
      dealtTiles: 'context/dealtTiles',
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
