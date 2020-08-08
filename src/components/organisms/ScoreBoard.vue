<template>
    <table>
        <tr class="row-top">
            <td class="wind">
                <div class="left">東</div>
            </td>
            <td>
                <div class="upper">20000</div>
            </td>
            <td class="wind">
                <div class="upper">北</div>
            </td>
        </tr>
        <tr class="row-middle">
            <td class="column-left">
                <div class="left">20000</div>
            </td>
            <td class="column-center">
                東一局
                <br>
                <span class="turn">68</span>
            </td>
            <td class="column-right">
                <div class="right">20000</div>
            </td>
        </tr>
        <tr class="row-bottom">
            <td class="wind">
                南
            </td>
            <td>
                20000
            </td>
            <td class="wind">
                <div class="right">西</div>
            </td>
        </tr>
    </table>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
table {
    text-align: center;
    border-collapse: collapse;
    background-color: #F8F8FF;
    color: #000088;
    font-size: 16px;
}
td {
    border-color: #6927FF;
    border: solid 1px;
}
table .wind {
    font-size: 26px;
}
table .turn {
    font-size: 34px;
}
.left {
    transform: rotate(90deg);
}
.upper {
    transform: rotate(180deg);
}
.right {
    transform: rotate(-90deg);
}
.row-middle {
    height: 90px;
}
.row-top,.row-bottom {
    height: 47px;
    height: 47px;
}
.column-center {
    width: 90px;
}
.column-left,.column-right {
    width: 47px;
}
</style>
