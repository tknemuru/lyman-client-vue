import Vue from 'vue'

/**
 * @description 静的モデル群
 */
const StaticModelsObj = Object.freeze({
  /**
   * @description APIドメイン
   */
  // ApiDomain: 'localhost:61639',
  ApiDomain: '7bc75d9733ed.ngrok.io',
  /**
   * @description フィールド位置
   */
  FieldPosition: {
    /** 下 */
    Lower: 'lower',
    /** 右 */
    Right: 'right',
    /** 上 */
    Upper: 'upper',
    /** 左 */
    Left: 'left'
  },
  /**
   * @description ターン種別
   */
  TurnType: {
    /** 自ターン */
    Self: 1,
    /** AIターンの代理操作 */
    OtherAgency: 2,
    /** 他ターン */
    Other: 3
  },
  /**
   * @description 部屋の状況
   */
  RoomState: {
    /** 未定義 */
    Undefined: 0,

    /** 入室中 */
    Entering: 1,

    /** 入室完了 */
    Entered: 2,

    /** 配牌完了 */
    Dealted: 3
  },
  /**
   * @description 部屋選択アクション種別
   */
  RoomSelectAction: {
    /** 新しく作る */
    Create: 1,
    /** 探す */
    Select: 2
  },
  /**
   * @description プレイヤ種別
   */
  PlayerType: {
    /** 人間 */
    Human: 0,
    /** CPU */
    Cpu: 1
  },
  /**
   * @description 風
   */
  Wind: {
    /** 未確定 */
    Undefined: -1,
    /** 東 */
    East: 0,
    /** 南 */
    South: 1,
    /** 西 */
    West: 2,
    /** 北 */
    North: 3
  }
})
const StaticModels = new Vue({
  name: 'StaticModels',
  data () {
    return StaticModelsObj
  }
})
export default StaticModels
