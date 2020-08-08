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
     * @param {Object} param0 state
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
      return response
    }
  },
  mutations: {
    /**
     * @description 初期化処理を行います。
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
    }
  },
  getters: {
    /**
     * @description 指定したフィールド位置の河牌リストを取得します。
     * @returns {Array} 指定したフィールド位置の河牌リスト
     */
    getFieldPositionRivers: state => fieldPosition => {
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
