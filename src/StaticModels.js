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
  }
})
const StaticModels = new Vue({
  name: 'StaticModels',
  data () {
    return StaticModelsObj
  }
})
export default StaticModels
