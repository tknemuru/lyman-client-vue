<template>
  <v-container
    fluid
    class="table-container">
    <v-row>
      <v-col
        cols="4">
      </v-col>
      <v-col
        cols="4">
        <ul class="upper">
          <li
            v-for="(tile, i) in getFieldPositionRivers(StaticModels.FieldPosition.Upper)"
            :key="i">
              <tile
                :tile="tile"
                domain="river">
              </tile>
          </li>
        </ul>
      </v-col>
      <v-col
        cols="4">
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="4">
        <ul class="left">
          <li
            v-for="(tile, i) in getFieldPositionRivers(StaticModels.FieldPosition.Left)"
            :key="i">
              <tile
                :tile="tile"
                domain="river">
              </tile>
          </li>
        </ul>
      </v-col>
      <v-col
        cols="4">
        <div class="grid-content score-board-container">
            <score-board></score-board>
        </div>
      </v-col>
       <v-col
        cols="4">
        <ul class="right">
          <li
            v-for="(tile, i) in getFieldPositionRivers(StaticModels.FieldPosition.Right)"
            :key="i">
              <tile
                :tile="tile"
                domain="river">
              </tile>
          </li>
        </ul>
      </v-col>
    </v-row>
    <v-row>
        <ul class="lower">
          <li
            v-for="(tile, i) in getFieldPositionRivers(StaticModels.FieldPosition.Lower)"
            :key="i">
              <tile
                :tile="tile"
                domain="river">
              </tile>
          </li>
        </ul>
    </v-row>
    <v-row
      class="tiles-container hands-container">
      <ul>
        <li
          v-for="(tile, i) in hand"
          :key="i">
            <tile
              :tile="tile"
              domain="hand"
              :last="(hand.length - 1) === i"
              @selected="onSelectedDiscardTile">
            </tile>
        </li>
      </ul>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ScoreBoard from '@/components/organisms/ScoreBoard'
import StaticModels from '@/StaticModels'
import Tile from '@/components/atoms/Tile'

/**
 * @description 麻雀卓
 */
export default {
  name: 'MahjongTable',
  components: {
    ScoreBoard,
    Tile
  },
  props: {
    sample: {
      type: String,
      default: null
    }
  },
  data () {
    return {
    }
  },
  computed: {
    StaticModels: () => StaticModels,
    ...mapState({
      hand: state => state.context.hand
    }),
    ...mapGetters({
      getFieldPositionRivers: 'context/getFieldPositionRivers'
    })
  },
  watch: {

  },
  mounted () {
  },
  methods: {
    /**
     * @description 捨牌を選択した時に実行します。
     * @param {Number} tile 捨牌
     */
    async onSelectedDiscardTile (tile) {
      await this.discard(tile)
      await this.reflesh()
    },
    ...mapActions({
      discard: 'context/discard',
      reflesh: 'context/reflesh'
    })
  }
}
</script>

<style scoped>
.table-container {
    background-image: url("../../assets/images/mat.jpg");
    background-size: 160%;
    background-position-x: 50%;
    background-position-y: 50%;
}
ul {
  list-style: none;
  padding: 0px;
  margin: 0px;
}
ul.upper li,ul.lower li,.hands-container li {
  display: inline-block;
}
ul.upper li,ul.lower li {
    height: 45.45px;
}
ul.upper {
    display: flex;
    max-width: 200px;
    flex-flow: row-reverse wrap-reverse;
    vertical-align: bottom;
    padding-top: 10px;
    padding-left: 48px;
}
ul.lower {
    display: flex;
    max-width: 200px;
    flex-flow: row wrap;
    vertical-align: top;
}
ul.right, ul.left {
    display: flex;
    max-height: 200px;
}
ul.left {
    flex-flow: column wrap-reverse;
    text-align: right;
    padding-right: 10px;
    padding-left: 200px;
}
ul.right {
    flex-flow: column wrap;
    padding-right: 210px;
}
.right li,.left li {
    height: 30px;
    width: 46px;
}
.tiles-container {
  white-space: nowrap;
}
.empty-space {
    height: 1px;
    width: 1px;
}
.right .empty-space,.left .empty-space {
    height: 30px;
    width: 45.45px;
}
.upper .empty-space,.lower .empty-space {
    width: 30px;
    height: 51.45px;
}
</style>
