<template>
  <v-dialog
    :value="active"
    persistent>
    <v-card
      v-if="!hasDecidedPlayerName">
      <v-text-field
        v-model="playerName"
        placeholder="名前を入力してください">
      </v-text-field>
      <v-btn
        @click="onClickDecidePlayerNameButton">
        決定
      </v-btn>
    </v-card>
    <v-card
      v-if="hasDecidedPlayerName && !roomSelectAction">
      <v-btn
        @click="onClickCreateRoomButton">
        部屋をつくる
      </v-btn>
      <v-btn
        @click="onClickSearchRoomButton">
        部屋をさがす
      </v-btn>
    </v-card>
    <v-card
      v-if="roomSelectAction === StaticModels.RoomSelectAction.Create">
      <span>新しい部屋名</span>
      <v-text-field
        v-model="roomName">
      </v-text-field>
      <span>参加人数</span>
      <v-select
        v-model="participants"
        :items="numberOfParticipants"
        item-text="label"
        item-value="value">
      </v-select>
      <v-btn
        @click="createRoomAndEnter">
        つくる
      </v-btn>
    </v-card>
    <v-card
      v-if="roomSelectAction === StaticModels.RoomSelectAction.Select">
      <div>入室する部屋を選んでください。</div>
      <v-data-table
        :items="rooms"
        :headers="headers"
        @item-selected="onSelectRoom"
        @click:row="onSelectRoom">
      </v-data-table>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import StaticModels from '@/StaticModels'

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
      /**
       * @description プレイヤ名を決めたかどうか
       */
      hasDecidedPlayerName: false,
      /**
       * @description 選択アクション種別
       */
      roomSelectAction: null,
      /**
       * @description 部屋名
       */
      roomName: null,
      /**
       * @description 参加人数
       */
      participants: null,
      /**
       * @description 部屋リスト
       */
      rooms: []
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
      if (!this.connectionId) {
        return false
      }
      return !this.roomState ||
        this.roomState === StaticModels.RoomState.Undefined
    },
    /**
     * @description プレイヤ名
     */
    playerName: {
      get () {
        return this.statePlayerName
      },
      set (val) {
        this.setPlayerName = val
      }
    },
    /**
     * @description 参加人数選択肢
     */
    numberOfParticipants () {
      return [1, 2, 3, 4].map(i => {
        return {
          label: i,
          value: i
        }
      })
    },
    /**
     * @description 部屋テーブルのヘッダリスト
     */
    headers () {
      return [
        {
          value: 'name',
          text: '部屋名',
          align: 'center',
          sortable: false
        }
      ]
    },
    ...mapState({
      connectionId: state => state.context.connectionId,
      roomState: state => state.context.roomState,
      statePlayerName: state => state.context.playerName
    }),
    ...mapGetters({
    })
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    /**
     * @description プレイヤ名決定ボタン押下時に実行します。
     * @returns {void}
     */
    onClickDecidePlayerNameButton () {
      this.hasDecidedPlayerName = true
    },
    /**
     * @description 部屋をつくる押下時に実行します。
     * @returns {void}
     */
    onClickCreateRoomButton () {
      this.roomSelectAction = StaticModels.RoomSelectAction.Create
    },
    /**
     * @description 部屋の作成と入室を行います。
     * @returns {void}
     */
    async createRoomAndEnter () {
      const creResponse = await this.createRoom({ roomName: this.roomName })
      // 自分の入室
      await this.enterRoom({ roomKey: creResponse.roomKey })
      // CPUの入室
      const cpuCount = 4 - this.participants
      for (let i = 0; i < cpuCount; i++) {
        await this.enterRoom({
          roomKey: creResponse.roomKey,
          playerName: `CpuPlayer${i + 1}`,
          isCpu: true
        })
      }
    },
    /**
     * @description 部屋をさがす押下時に実行します。
     * @returns {void}
     */
    async onClickSearchRoomButton () {
      this.roomSelectAction = StaticModels.RoomSelectAction.Select
      const rooms = await this.searchRoom()
      console.log(rooms)
      this.rooms = rooms
    },
    /**
     * @description 入室ボタン押下時に実行します。
     * @param {Object} room 部屋
     * @returns {void}
     */
    async onSelectRoom (room) {
      this.enterRoom({
        roomKey: room.key,
        roomName: room.name
      })
    },
    ...mapMutations({
      setPlayerName: 'context/setPlayerName'
    }),
    ...mapActions({
      createRoom: 'context/createRoom',
      enterRoom: 'context/enterRoom',
      searchRoom: 'context/searchRoom'
    })
  }
}
</script>

<style scoped>
</style>
