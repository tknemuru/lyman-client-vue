import axios from 'axios'
import StaticModels from '@/StaticModels'

export default {
  namespaced: true,
  state () {
    return {
      /**
       * @description コネクションID
       */
      connectionId: null,
      /**
       * @description アクション確認をスキップするかどうか
       */
      skipConfirmAction: false,
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
      rivers: [],
      /**
       * @description リーチ可能性情報
       */
      reachableInfo: null,
      /**
       * @description ロン可能性情報
       */
      ronableInfo: null,
      /**
       * @description ツモ上がり可能性情報
       */
      drawWinnableInfo: null
    }
  },
  actions: {
    /**
     * @description コネクションIDを更新します。
     * @param {Object} param0 store
     */
    async updateConnectionId ({ state }) {
      const body = {
        roomKey: state.roomKey,
        playerKey: state.playerKey,
        connectionId: state.connectionId
      }
      await axios.post(`https://${StaticModels.ApiDomain}/api/updateConnectionId/`, body)
    },
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
            playerType: StaticModels.PlayerType.Human,
            playerName: 'myself',
            connectionId: state.connectionId
          },
          {
            playerType: StaticModels.PlayerType.Cpu,
            playerName: 'other1'
          },
          {
            playerType: StaticModels.PlayerType.Cpu,
            playerName: 'other2'
          },
          {
            playerType: StaticModels.PlayerType.Cpu,
            playerName: 'other3'
          }
        ],
        dealtTilesRequest: {
        },
        selectRoomRequest: {
        }
      }
      const response = await axios.post(`https://${StaticModels.ApiDomain}/api/quickstart/`, body)
      commit('init', response.data)
      console.log(state)
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
      const response = await axios.post(`https://${StaticModels.ApiDomain}/api/selectroom/`, body)
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
      const response = await axios.post(`https://${StaticModels.ApiDomain}/api/draw/`, body)
      commit('setDrawWinnableInfo', response.data.drawWinnableInfo)
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
      const response = await axios.post(`https://${StaticModels.ApiDomain}/api/aiDraw/`, body)
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
      const response = await axios.post(`https://${StaticModels.ApiDomain}/api/discard/`, body)
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
      const response = await axios.post(`https://${StaticModels.ApiDomain}/api/aiDiscard/`, body)
      return response
    },
    /**
     * @description 部屋を作成します。
     * @param {Object} param0 store
     * @returns {Object} 作成結果
     */
    async createRoom ({ state }, param) {
      const body = param
      const response = await axios.post(`https://${StaticModels.ApiDomain}/api/createRoom/`, body)
      return response.data
    },
    /**
     * @description 部屋を探します。
     * @param {Object} param0 store
     * @returns {Object} 部屋リスト
     */
    async searchRoom ({ state }) {
      const body = {
      }
      const response = await axios.post(`https://${StaticModels.ApiDomain}/api/searchRoom/`, body)
      return response.data
    },
    /**
     * @description 入室します。
     * @param {Object} param0 store
     * @param {Object} param パラメータ
     * @param {String} param.roomKey ルームキー
     * @param {String} param.playerType プレイヤ種別
     * @param {String} param.playerName プレイヤ名
     * @returns {Object} 入室結果
     */
    async enterRoom ({ state, commit }, param) {
      const body = {
        roomKey: param.roomKey,
        playerName: param.playerName || state.playerName,
        connectionId: param.playerType === StaticModels.PlayerType.Human ? state.connectionId : null
      }
      const response = await axios.post(`https://${StaticModels.ApiDomain}/api/enterRoom/`, body)
      if (param.playerType === StaticModels.PlayerType.Human) {
        commit('setRoomEnterdInfo',
          Object.assign(
            response.data,
            param
          )
        )
      }
      return response.data
    },
    /**
     * @description 配牌を行います。
     * @param {Object} param0 store
     * @returns {Object} 配牌結果
     */
    async dealtTiles ({ state }) {
      const body = {
        roomKey: state.roomKey,
        playerKey: state.playerKey
      }
      const response = await axios.post(`https://${StaticModels.ApiDomain}/api/dealtTiles/`, body)
      return response.data
    }
  },
  mutations: {
    /**
     * @description コネクションIDを設定します。
     * @param {Object} state state
     * @param {String} id コネクションID
     */
    setConnectionId (state, id) {
      state.connectionId = id
    },
    /**
     * @description プレイヤ名を設定します。
     * @param {Object} state state
     * @param {String} name プレイヤ名
     */
    setPlayerName (state, name) {
      state.playerName = name
    },
    /**
     * @description アクション確認をスキップするかどうかを設定します。
     * @param {Object} state state
     * @param {Boolean} is アクション確認をスキップするかどうか
     */
    setSkipConfirmAction (state, is) {
      state.skipConfirmAction = is
    },
    /**
     * @description 初期化処理を行います。
     * @param {Object} context 状態
     */
    init (state, context) {
      state.skipConfirmAction = false
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
      state.rivers = params.rivers
      state.roomName = params.name
      state.roomState = params.state
      state.turn = params.turn
      state.players = params.players
      state.hand = params.hand
      state.reachableInfo = params.reachableInfo
      state.ronableInfo = params.ronableInfo
      console.log(state)
    },
    /**
     * @description ツモ上がり可能性情報を設定します。
     * @param {Object} info ツモ上がり可能性情報
     */
    setDrawWinnableInfo (state, info) {
      state.drawWinnableInfo = info
    },
    /**
     * @description 入室情報を設定します。
     * @param {Object} state state
     * @param {Object} param パラメータ
     */
    setRoomEnterdInfo (state, param) {
      state.roomKey = param.roomKey
      state.roomName = param.roomName
      state.playerKey = param.playerKey
      state.windIndex = param.windIndex
      state.wind = param.wind
      state.firstPlayer = param.firstPlayer
      state.windPositions = buildWindPositions(param.windIndex)
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
        state.windPositions[fieldPosition] == null ||
        !Array.isArray(state.rivers) ||
        !Array.isArray(state.rivers[state.windPositions[fieldPosition]])) {
        return []
      }
      return state.rivers[state.windPositions[fieldPosition]]
    },
    /**
     * @description ターン種別を取得します。
     * @param {Number} turn ターン
     * @returns {Number} ターン種別
     */
    getTurnType (state) {
      let type
      if (state.turn === state.windIndex) {
        type = StaticModels.TurnType.Self
      } else {
        if (state.firstPlayer &&
          state.players[state.turn].playerType === StaticModels.PlayerType.Cpu) {
          type = StaticModels.TurnType.OtherAgency
        } else {
          type = StaticModels.TurnType.Other
        }
      }
      return type
    },
    /**
     * @description リーチできるかどうか
     * @param {Object} state state
     */
    reachable (state) {
      return state.reachableInfo && state.reachableInfo.reachable
    },
    /**
     * @description ロンできるかどうか
     * @param {Object} state state
     */
    ronable (state) {
      return state.ronableInfo && state.ronableInfo.ronable
    },
    /**
     * @description ツモであがれるかどうか
     * @param {Object} state state
     */
    drawWinnable (state) {
      console.log(state.drawWinnableInfo)
      return state.drawWinnableInfo && state.drawWinnableInfo.drawWinnable
    },
    /**
     * @description アクション確認する必要があるかどうか
     * @param {Object} state state
     */
    requiredConfirmAction (state, getters) {
      if (state.skipConfirmAction) {
        console.log('★skip！！')
        return false
      }
      return getters.reachable || getters.ronable || getters.drawWinnable
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
