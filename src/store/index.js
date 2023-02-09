import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import station from './modules/station'
import hot from './modules/hot'
import calendar from './modules/calendar'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        st: station,
        hot: hot,
        calendar: calendar
    },
    state: {
        isLogin: false,
        userId: 0,
        userName: '',
        mailAddress: '',
        password: ''
    },
    mutations: {
        login(state, param) {
            state.isLogin = true;
            state.userId = param.userId;
            state.userName = param.userName;
            state.mailAddress = param.mailAddress;
            state.password = param.password;
            console.log(state)
        },
        logout(state) {
            state.isLogin = false;
            state.userId = '';
            state.password = '';
        }
    },
    actions: {
        async login({ commit }, { mailAddress, password }) {
            const param = {
                mailAddress: mailAddress,
                password: password
            }

            try {
                const loginResult = await axios.post(' http://localhost:3000/login', param);
                console.log("userid" + mailAddress);
                console.log("pass" + password);
                console.log(loginResult);
                console.log(loginResult.data)
                if (loginResult.data == 'NG') {
                    // 認証に失敗した場合
                    console.log('認証に失敗しました。');
                } else {
                    // 認証に成功した場合
                    param.userId = loginResult.data[0].userId
                    param.userName = loginResult.data[0].userName
                    console.log(param.userId)
                    console.log(param.userName)
                    commit('login', param);

                }
            } catch {
                alert('処理に失敗しました。')
            }

        },
        async newMember({ dispatch }, { userName, mailAddress, password }) {
            const param = {
                userName: userName,
                mailAddress: mailAddress,
                password: password
            }

            try {
                const loginResult = await axios.post(' http://localhost:3000/newMember', param);
                console.log("userid" + mailAddress);
                console.log("pass" + password);
                console.log(loginResult);
                console.log(loginResult.data)
                await dispatch('login', {
                    mailAddress: param.mailAddress,
                    password: param.password,
                })
            } catch {
                alert('処理に失敗しました。')
            }

        },
        async logout({ commit }) {
            commit('logout');
        }
    }
})