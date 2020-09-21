'use strict'

import Vue from 'vue'
import { mapMutations } from 'vuex'
import * as signalR from '@microsoft/signalr'
import store from '@/store/index'

/**
 * @description SignalRの管理機能を提供します。
 */
const signalRManager = new Vue({
  store,
  data () {
    return {
      connection: null
    }
  },
  computed: {
  },
  methods: {
    /**
     * @description 初期化を行います。
     * @returns {void}
     */
    init () {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:61639/contexthub')
        .withAutomaticReconnect()
        .build()
      // this.connection
      //   .start()
      //   .then(() => {
      //     console.log('Connection started')
      //   })
      //   .catch(err => console.log('Error while starting connection: ' + err))
      this.connection.on('ReceiveMessage', contextJson => {
        console.log('★ReceiveMessage')
        console.log(contextJson)
        const context = JSON.parse(contextJson)
        console.log(context)
        this.reflect(context)
      })
      const vm = this
      vm.startConnection()
      // this.connection.onclose(async () => {
      //   await vm.startConnection()
      // })
    },
    async startConnection () {
      try {
        await this.connection.start()
        console.log('Connection started')
      } catch (err) {
        console.log(err)
        const vm = this
        setTimeout(() => vm.startConnection(), 5000)
      }
    },
    ...mapMutations({
      reflect: 'context/reflectNotifyRoomContext'
    })
  }
})
export default signalRManager
