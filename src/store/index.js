import { createStore } from 'vuex'

export default createStore({
  state: {
    current_login: {
      current_usr : '',
      current_email :'',
      current_password :'',
      current_cnf_password : '',
      current_isLogin : ''
    },

    isEdit : false,
    dctHome : false,
    isDelete : false,
    row : '',
    userName : ''
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
