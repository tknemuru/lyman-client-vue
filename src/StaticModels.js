import Vue from 'vue'

/**
 * @description 静的モデル群
 */
const StaticModelsObj = Object.freeze({
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
  }
})
const StaticModels = new Vue({
  name: 'StaticModels',
  data () {
    return StaticModelsObj
  }
})
export default StaticModels
