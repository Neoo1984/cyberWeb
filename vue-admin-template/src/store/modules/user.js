import {login, logout, getInfo} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    role:'',
    roleType:'',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLE:(state,role) => {
    state.role = role
  },
  SET_TYPE:(state,roleType) => {
    state.roleType = type
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({commit}, userInfo) {
    const {mobile, password, loginType} = userInfo
    return new Promise((resolve, reject) => {
      login({mobile: mobile.trim(), password: password, loginType: loginType}).then(response => {
        if (response.data.success){
          const token = response.data.data.token
          const role = response.data.data.userInfo
          commit('SET_TOKEN', token)
          commit('SET_ROLE',role)
          setToken(token)
          resolve(response)
        }else {
          console.log(response)
          resolve(response)
        }
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  // user logout
  logout({commit, state}) {
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     removeToken() // must remove  token  first
    //     resetRouter()
    //     commit('RESET_STATE')
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
    removeToken() // must remove  token  first
    resetRouter()
    commit('RESET_STATE')
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response
  //
  //       if (!data) {
  //         return reject('Verification failed, please Login again.')
  //       }
  //
  //       const { name, avatar } = data
  //
  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

