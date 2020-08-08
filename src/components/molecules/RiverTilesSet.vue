<template>
  <ul class="upper">
    <li
      v-for="(tile, i) in tiles"
      :key="i">
        <tile
          :tile="tile"
          domain="river">
        </tile>
    </li>
  </ul>
</template>

<script>
import Tile from '@/components/atoms/Tile'

/**
 * @description 河牌セットリスト
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
