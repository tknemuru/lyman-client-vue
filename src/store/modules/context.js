import axios from 'axios'

export default {
  namespaced: true,
  state () {
    return {
      /**
       * @description ルームキー
       */
      roomKey: null,
      /**
       * @description 自分の風を示すインデックス
       */
      windIndex: null,
      /**
       * @description 自分の風名称
       */
      wind: null,
      /**
       * @description 風とフィールド位置の組み合わせ情報
       */
      windPositions: {},
      /**
       * @description プレイヤキー
       */
      playerKey: null,
      /**
       * @description プレイヤ名
       */
      playerName: null,
      /**
       * @description 自分が初めて入室したプレイヤかどうか
       */
      firstPlayer: false,
      /**
       * @description ルーム名
       */
      roomName: null,
      /**
       * @description ルーム状態
       */
      roomState: null,
      /**
       * @description ターン
       */
      turn: null,
      /**
       * @description ルーム内のプレイヤ
       */
      players: {},
      /**
       * @description 手牌
       */
      hand: [],
      /**
       * @description 河牌
       */
      rivers: []
    }
  },
  actions: {
    /**
     * @description 即時開始処理を行います。
     * @param {Object} param0 store
     */
    async quickStart ({ state, commit }) {
      const body = {
        createRoomRequest: {
          roomName: 'test1'
        },
        enterRoomRequests: [
          {
            playerName: 'myself'
          },
          {
            playerName: 'other1'
          },
          {
            playerName: 'other2'
          },
          {
            playerName: 'other3'
          }
        ],
        dealtTilesRequest: {
        },
        selectRoomRequest: {
        }
      }
      const response = await axios.post('http://localhost:25486/api/quickstart/', body)
      commit('init', response.data)
      console.log(state)
      console.log(response.data)
      return response
    },
    /**
     * @description ルーム情報を最新に更新します。
     * @param {Object} param0 store
     */
    async reflesh ({ state, commit }) {
      const body = {
        roomKey: state.roomKey,
        playerKey: state.playerKey
      }
      const response = await axios.post('http://localhost:25486/api/selectroom/', body)
      console.log(response.data)
      commit('reflesh', response.data)
      return response
    },
    /**
     * @description ツモを行います。
     * @param {Object} param0 store
     */
    async draw ({ state, commit }) {
      const body = {
        roomKey: state.roomKey,
        playerKey: state.playerKey
      }
      const response = await axios.post('http://localhost:25486/api/draw/', body)
      console.log(response.data)
      return response
    },
    /**
     * @description 代理でAIのツモを行います。
     * @param {Object} param0 store
     */
    async aiDraw ({ state, commit }) {
      const body = {
        roomKey: state.roomKey,
        playerKey: state.playerKey
      }
      const response = await axios.post('http://localhost:25486/api/aiDraw/', body)
      console.log(response.data)
      return response
    },
    /**
     * @description 捨牌を行います。
     * @param {Object} param0 store
     * @param {String} tile 捨牌
     */
    async discard ({ state, commit }, tile) {
      const body = {
        roomKey: state.roomKey,
        playerKey: state.playerKey,
        tile: tile
      }
      const response = await axios.post('http://localhost:25486/api/discard/', body)
      console.log(response.data)
      return response
    },
    /**
     * @description 代理でAIの捨牌を行います。
     * @param {Object} param0 store
     */
    async aiDiscard ({ state, commit }) {
      const body = {
        roomKey: state.roomKey,
        playerKey: state.playerKey
      }
      const response = await axios.post('http://localhost:25486/api/aiDiscard/', body)
      console.log(response.data)
      return response
    }
  },
  mutations: {
    /**
     * @description 初期化処理を行います。
     * @param {Object} context 状態
     */
    init (state, context) {
      state.roomKey = context.roomKey
      state.windIndex = context.windIndex
      state.wind = context.wind
      state.playerKey = context.playerKey
      state.playerName = context.playerName
      state.firstPlayer = context.firstPlayer
      state.roomName = context.roomName
      state.roomState = context.state
      state.turn = context.turn
      state.players = context.players
      state.hand = context.hand
      state.rivers = context.rivers
      state.windPositions = buildWindPositions(context.windIndex)
    },
    /**
     * @description 最新情報に更新します。
     * @param {Object} params パラメータ
     */
    reflesh (state, params) {
      state.hand = params.hand
      state.rivers = params.rivers
      state.roomName = params.name
      state.roomState = params.state
      state.turn = params.turn
    }
  },
  getters: {
    /**
     * @description 指定したフィールド位置の河牌リストを取得します。
     * @returns {Array} 指定したフィールド位置の河牌リスト
     */
    getFieldPositionRivers: state => fieldPosition => {
      console.log(state.windPositions)
      if (!state.windPositions ||
        !state.windPositions[fieldPosition] ||
        !Array.isArray(state.rivers) ||
        !Array.isArray(state.rivers[state.windPositions[fieldPosition]])) {
        return []
      }
      return state.rivers[state.windPositions[fieldPosition]]
    }
  }
}

/**
 * @description 風とフィールド位置の組み合わせ情報を組み立てます。
 * @returns {Object} 風とフィールド位置の組み合わせ情報
 */
function buildWindPositions (windIndex) {
  const windPositions = {}
  const position = ['lower', 'right', 'upper', 'left']
  for (let i = 0; i < position.length; i++) {
    windPositions[position[i]] = (windIndex + i) % 4
  }
  return windPositions
}
