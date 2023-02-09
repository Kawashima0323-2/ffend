//import axios from 'axios'
const state = {
    startDate: "",
    endDate: "",

};
const mutations = {
    startEndDate(state, param) {
        state.startDate = param.startDate
        state.endDate = param.endDate
        console.log(state.startDate)
        console.log(state.endDate)
    }

};
const actions = {
    startEndDate({ commit }, { startDate, endDate }) {
        const param = {
            startDate: startDate,
            endDate: endDate
        };
        commit('startEndDate', param)
    }
};
const methods = {

};
export default {
    state,
    mutations,
    actions,
    methods,
}