import axios from 'axios'
const state = {
    from: "", //出発駅
    to: "", //到着駅
    stationListFrom: [],
    stationListTo: [],
    station: [],
    price: 0,
};
const mutations = {
    onchangeFrom(state, param) {
        state.stationListFrom = param.stationListFrom;
    },
    logout(state) {
        state.isLogin = false;
        state.userId = '';
        state.password = '';
    }
};
const actions = {
    //検索してものをクリックしたら反映される
    async onchangeFrom({ commit }, { from }) {
        const param = {

                from: from,
                stationListFrom: []
            }
            //URLに向けて通信する。t5
        this.stationListFrom = [];
        this.station = [];
        //検索した名前で絞っている
        axios.get("https://api.ekispert.jp/v1/json/station/light?key=test_LJYtHBhahBd&type=train&nameMatchType=partial&name=" + param.from)
            .then(function(response) {
                //通信に成功した時の処理
                //responseの中に返ってきたオブジェクトが入ってる
                var cnt = 0;

                response.data.ResultSet.Point.forEach(element => {
                    param.stationListFrom[cnt++] = element.Station.Name;
                    console.log(param.stationListFrom)
                });
                commit("onchangeFrom", param)
            }.bind(this))
            .catch(function(error) {
                //エラーをキャッチした時。
                console.log(error);
            })
            .finally(function() {
                //ファイナリーです。
            });
    },
    onchangeTo() {
        //URLに向けて通信する。
        axios.get("https://api.ekispert.jp/v1/json/station/light?key=test_LJYtHBhahBd&type=train&nameMatchType=partial&name=" + this.to)
            .then(function(response) {
                //通信に成功した時の処理
                //responseの中に返ってきたオブジェクトが入ってる。
                var cnt = 0;
                response.data.ResultSet.Point.forEach(element => {
                    if (element.Station.Type == "train") {
                        this.stationListTo[cnt++] = element.Station.Name;
                    }
                });
            }.bind(this))
            .catch(function(error) {
                //エラーをキャッチした時。
                console.log(error);
            })
            .finally(function() {
                //ファイナリーです。
            });
    },
    searchFare() {
        axios.get("https://api.ekispert.jp/v1/json/search/course/extreme?key=test_LJYtHBhahBd &viaList=" + this.from + ":" + this.to)
            .then(function(response) {
                //通信に成功した時の処理fdfdfss
                //responseの中に返ってきたオブジェクトが入ってる。
                //片道運賃
                console.log("運賃:" + response.data.ResultSet.Course[0].Price[0].Oneway);
                console.log("停車駅:" + response.data.ResultSet.Course[0].Teiki.DisplayRoute);
                console.log("時刻:" + response.data.ResultSet.Course[0].Route.Line.DepartureState.Datetime.text);
                const str = response.data.ResultSet.Course[0].Route.Line.DepartureState.Datetime.text;
                const beginIdx = str.indexOf("T");
                const endIdx = str.indexOf(":");
                const result = str.substring(beginIdx + 1, endIdx + 3);
                console.log(result);

            }.bind(this))
            .catch(function(error) {
                //エラーをキャッチした時。
                console.log(error);
            })
            .finally(function() {
                //ファイナリーです。
            })
    }
}
export default {
    state,
    mutations,
    actions
}