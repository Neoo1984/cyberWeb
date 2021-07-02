import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import store from '@/store'
import {getToken, setToken} from '@/utils/auth'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API
    // withCredentials: true,
    // timeout: 5000
})
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['Token'] = getToken()
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)
service.interceptors.response.use(response => {
        setToken(response.headers['refresh-token'])
        sessionStorage.setItem('token', response.headers['refresh-token'])
        if (response.status === 200) {
            const data = response.data
            if (data.errorCode === '200007') {
                MessageBox.confirm(
                    '登录过期，请重新登录',
                    '确认登出', {
                        confirmButtonText: '重新登录',
                        type: 'warning',
                        showClose: false,
                        showCancelButton: false,
                        closeOnClickModal: false,
                        closeOnPressEscape: false
                    }
                ).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
                return Promise.reject(new Error(data.message || 'Error'))
            } else if (!data.success) {
                Message({
                    message: '获取数据失败！',
                    type: 'error',
                    duration: 2 * 1000
                })

                // TODO userType !== '1' 不让登录
            }
            return response
        } else {

        }
    }
// response interceptor
// service.interceptors.response.use(
//   /**
//    * If you want to get http information such as headers or status
//    * Please return  response => response
//    */
//
//   /**
//    * Determine the request status by custom code
//    * Here is just an example
//    * You can also judge the status by HTTP Status Code
//    */
//   response => {
//     const res = response.data
//
//     // if the custom code is not 20000, it is judged as an error.
//     if (res.code !== 20000) {
//       Message({
//         message: res.message || 'Error',
//         type: 'error',
//         duration: 5 * 1000
//       })
//
//       // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         // to re-login
//         MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
//           confirmButtonText: 'Re-Login',
//           cancelButtonText: 'Cancel',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('user/resetToken').then(() => {
//             location.reload()
//           })
//         })
//       }
//       return Promise.reject(new Error(res.message || 'Error'))
//     } else {
//       return res
//     }
//   },
//   error => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

)
export default service
