<template>
  <img
    :class="classObject"
    :src="imagePath"
    @click="onSelected">
</template>

<script>
/**
 * @description 牌
 */
export default {
  data () {
    return {
      selected: false
    }
  },
  props: {
    tile: {
      type: Number,
      required: true
    },
    domain: {
      type: String,
      required: true
    },
    last: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classObject () {
      return {
        hand: this.domain === 'hand',
        river: this.domain === 'river',
        last: this.last
      }
    },
    imagePath () {
      return require(`@/assets/images/tiles/${this.tile}.png`)
    }
  },
  methods: {
    /**
     * 選択時に実行します。
     */
    onSelected () {
      this.$emit('selected', this.tile)
    }
  }
}
</script>

<style scoped>
img {
    width: 60px;
    height: auto;
}
img.river {
    width: 30px;
}
.left img.river {
  transform: rotate(90deg);
}
.right img.river {
  transform: rotate(-90deg);
}
.upper img.river {
  transform: rotate(180deg);
}
.hand:hover,.hand.last {
    margin-bottom: 40%;
    cursor: pointer;
}
</style>
