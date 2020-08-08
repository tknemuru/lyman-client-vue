import axios from 'axios'

export default {
  namespaced: true,
  state () {
    return {
    }
  },
  actions: {
    async quickStart ({ state, commit }) {
      const body = {
        createRoomRequest: {
          roomName: 'test1'
        },
        enterRoomRequests: [
          {
            playerName: 'myself'
          },
          {
            playerName: 'other1'
          },
          {
            playerName: 'other2'
          },
          {
            playerName: 'other3'
          }
        ],
        dealtTilesRequest: {
        },
        selectRoomRequest: {
        }
      }
      const result = await axios.post('http://localhost:25486/api/quickstart/', body)
      return result
    }
  },
  mutations: {

  },
  getters: {

  }
}
