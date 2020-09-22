'use strict'

import Vue from 'vue'
import { mapMutations, mapActions } from 'vuex'
import * as signalR from '@microsoft/signalr'
import store from '@/store/index'
import StaticModels from '@/StaticModels'

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
        .withUrl(`https://${StaticModels.ApiDomain}/contexthub`)
        .withAutomaticReconnect()
        .build()
      this.connection.on('notifyRoomContext', contextJson => {
        console.log(contextJson)
        const context = JSON.parse(contextJson)
        console.log(context)
        this.reflesh(context)
      })
      this.connection.onreconnected(connectionId => {
        console.log(connectionId)
        this.setConnectionId(this.connection.connectionId)
        this.updateConnectionId(connectionId)
      })
      this.connection.start()
        .then(() => {
          console.log('Connection started')
          console.log(this.connection.connectionId)
          this.setConnectionId(this.connection.connectionId)
        })
    },
    ...mapActions({
      updateConnectionId: 'context/updateConnectionId'
    }),
    ...mapMutations({
      reflesh: 'context/reflesh',
      setConnectionId: 'context/setConnectionId'
    })
  }
})
export default signalRManager
