<template>
  <v-dialog
    :value="requiredConfirmAction"
    persistent>
    <div
      v-if="reachable">
      <v-btn>
        リーチ
      </v-btn>
      <v-btn>
        スキップ
      </v-btn>
    </div>
    <div
      v-if="ronable">
      <template
        v-for="(yaku, i) in ronableInfo.yakuCandidates">
        <v-btn
          :key="`ron-confirm-${i}`">
          ロン {{ yaku }}
        </v-btn>
        <v-btn
          :key="`ron-skip-${i}`">
          スキップ
        </v-btn>
      </template>
    </div>
    <div
      v-if="drawWinnable">
      <template
        v-for="(yaku, i) in drawWinnableInfo.yakuCandidates">
        <v-btn
          :key="`draw-confirm-${i}`">
          ツモ {{ yaku }}
        </v-btn>
        <v-btn
          :key="`draw-skip-${i}`">
          スキップ
        </v-btn>
      </template>
    </div>
  </v-dialog>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

/**
 * @description リーチ確認モーダル
 */
export default {
  components: {
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      drawWinnableInfo: state => state.context.drawWinnableInfo,
      reachableInfo: state => state.context.reachableInfo,
      ronableInfo: state => state.context.ronableInfo
    }),
    ...mapGetters({
      drawWinnable: 'context/drawWinnable',
      reachable: 'context/reachable',
      requiredConfirmAction: 'context/requiredConfirmAction',
      ronable: 'context/ronable'
    })
  },
  watch: {
    reachable (val) {
      console.log(val)
    }
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
