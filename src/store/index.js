import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import station from './modules/station'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        station
    },
    state: {
        isLogin: false,
        userId: '',
        password: ''
    },
    mutations: {
        login(state, param) {
            state.isLogin = true;
            state.userId = param.userId;
            state.password = param.password;
        },
        logout(state) {
            state.isLogin = false;
            state.userId = '';
            state.password = '';
        }
    },
    actions: {
        async login({ commit }, { userId, password }) {
            const param = {
                userId: userId,
                password: password
            }

            try {
                const loginResult = await axios.post(' http://localhost:3000/login', param);
                console.log("userid" + userId);
                console.log("pass" + password);
                console.log(loginResult);
                console.log(loginResult.data)
                if (loginResult.data === 'OK') {
                    // 認証に成功した場合
                    commit('login', param);
                } else {
                    // 認証に失敗した場合
                    console.log('認証に失敗しました。');
                }
            } catch {
                alert('処理に失敗しました。')
            }

        },
        logout({ commit }) {
            commit('logout');
        }
    }
})