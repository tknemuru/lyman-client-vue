<template>
  <ul>
    <li
      v-for="(tile, i) in tiles"
      :key="i">
        <tile
          :tile="tile"
          domain="hand"
          :last="(hand.length - 1) === i">
        </tile>
    </li>
  </ul>
</template>

<script>
import Tile from '@/components/atoms/Tile'

/**
 * @description 手牌セットリスト
 */
export default {
  components: {
    Tile
  },
  props: {
    tiles: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
