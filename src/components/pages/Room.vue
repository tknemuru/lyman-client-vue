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
      requiredConfirmAction: 'context/requiredConfirmAction'
    })
  },
  watch: {
    turn (val) {
      console.log(val)
      this.executeTurnAction()
    }
  },
  mounted () {
    this.quickStart()
  },
  methods: {
    /**
     * @description ダイアログ選択のアクションをスキップした時に実行します。
     * @returns {void}
     */
    onActionSkip () {
      this.executeTurnAction()
    },
    /**
     * @description ターンごとのアクションを実行します。
     * @returns {void}
     */
    async executeTurnAction () {
      const turnType = this.getTurnType(this.turn)
      switch (turnType) {
        case StaticModels.TurnType.Self:
          // ルーム情報を最新に更新
          await this.reflesh()
          if (!this.requiredConfirmAction) {
            // ツモ
            await this.draw()
            // ルーム情報を最新に更新
            await this.reflesh()
          }
          break
        case StaticModels.TurnType.OtherAgency:
          // ルーム情報を最新に更新
          await this.reflesh()
          // AIのツモ
          await this.aiDraw()
          // AIの捨牌
          await this.aiDiscard()
          break
        case StaticModels.TurnType.Other:
          // ルーム情報を最新に更新
          await this.reflesh()
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
    })
  }
}
</script>

<style scoped>
</style>
