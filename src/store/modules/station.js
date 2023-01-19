import axios from 'axios'

const state = {
    from: "", //出発駅
    to: "", //到着駅
    stationListFrom: [],
    stationListTo: [],
    station: [],
    stationListParam: []
};
const mutations = {
    searchFrom(state, param) {
        state.stationListFrom = param.stationListFrom;
    },
    searchTo(state, param) {
        state.stationListTo = param.stationListTo;
    },
    searchFare(state, stationList) {

        state.stationListParam.push(JSON.parse(JSON.stringify(stationList)));


        console.log(JSON.stringify(state.stationListParam) + "2")

    },
};
const actions = {
    async searchFrom({ commit }, { from }) {
        const param = {

            from: from,
            stationListFrom: []
        }
        axios.get("https://api.ekispert.jp/v1/json/station/light?key=test_LJYtHBhahBd&type=train&nameMatchType=partial&name=" + param.from)
            .then(function(response) {
                var cnt = 0;

                response.data.ResultSet.Point.forEach(element => {
                    if (element.Station.Type == "train") {
                        param.stationListFrom[cnt++] = element.Station.Name;

                    }
                });
                commit('searchFrom', param)

            }.bind(this))
            .catch(function(error) {
                //エラーをキャッチした時。
                console.log(error);
            })
            .finally(function() {
                //ファイナリーです。
            });
    },
    async searchTo({ commit }, { to }) {
        const param = {

            to: to,
            stationListTo: []
        }
        console.log("to");
        axios.get("https://api.ekispert.jp/v1/json/station/light?key=test_LJYtHBhahBd&type=train&nameMatchType=partial&name=" + param.to)
            .then(function(response) {
                var cnt = 0;
                response.data.ResultSet.Point.forEach(element => {
                    if (element.Station.Type == "train") {
                        param.stationListTo[cnt++] = element.Station.Name;

                    }
                });
                commit('searchTo', param)

            }.bind(this))
            .catch(function(error) {
                //エラーをキャッチした時。
                console.log(error);
            })
            .finally(function() {
                //ファイナリーです。
            });
    },
    async searchFare({ commit }, { from, to }) {
        const stationList = {
            cnt: 0,
            from: from,
            to: to,
            fare: "",
            rideTime: "",
            numberOfStops: "",
            departureTime: "",
            arrivalTime: "",
            departureTrack: "",
            arrivalTrack: "",
        };
        const param = {
            from: from,
            to: to,
            sl: [],
            stationListTo: [],
            stationListParam: []


        }
        var str = ""
        var beginIdx = ""
        var endIdx = ""
        var resultDeparture = ""
        var resultArrival = ""
        console.log(param.from + param.to + "js:from:to"),
            axios.get("https://api.ekispert.jp/v1/json/search/course/extreme?key=test_LJYtHBhahBd&viaList=" + param.from + ":" + param.to)
            .then(function(response) {
                //通信に成功した時の処理fdfdfss
                //responseの中に返ってきたオブジェクトが入ってる。
                //片道運賃
                console.log("運賃:" + response.data.ResultSet.Course[0].Price[0].Oneway);
                console.log("乗車時間" + response.data.ResultSet.Course[0].Route.timeOnBoard);
                console.log("停車駅数" + response.data.ResultSet.Course[0].Route.Line.stopStationCount);
                console.log("路線名称" + response.data.ResultSet.Course[0].Route.Line.Name);
                console.log();
                console.log("停車駅:" + response.data.ResultSet.Course[0].Teiki.DisplayRoute);
                console.log("時刻:" + response.data.ResultSet.Course[0].Route.Line.DepartureState.Datetime.text);
                str = response.data.ResultSet.Course[0].Route.Line.DepartureState.Datetime.text;
                beginIdx = str.indexOf("T");
                endIdx = str.indexOf(":");
                resultDeparture = str.substring(beginIdx + 1, endIdx + 3);
                console.log(resultDeparture + "re");


                response.data.ResultSet.Course.forEach(element => {
                    if (element.Route.Line.Type == "train") {
                        element.Price.forEach(element => {
                            if (element.Type == "Fare") {

                                console.log("運賃:" + element.Oneway + "pr");
                                console.log(stationList.cnt + "cnt")

                                stationList.fare = element.Oneway;


                                console.log(param.stationListParam + "sl")


                            }

                        })

                        console.log("出発時刻" + element.Route.Line.DepartureState.Datetime.text)

                        str = element.Route.Line.DepartureState.Datetime.text;
                        beginIdx = str.indexOf("T");
                        endIdx = str.indexOf(":");
                        resultDeparture = str.substring(beginIdx + 1, endIdx + 3);
                        console.log(resultDeparture + "re");
                        stationList.departureTime = resultDeparture;
                        str = element.Route.Line.ArrivalState.Datetime.text;
                        beginIdx = str.indexOf("T");
                        endIdx = str.indexOf(":");
                        resultArrival = str.substring(beginIdx + 1, endIdx + 3);
                        console.log(resultArrival + "re");
                        stationList.arrivalTime = resultArrival;

                        console.log("出発番線" + element.Route.Line.DepartureState.no)
                        console.log("到着番線" + element.Route.Line.ArrivalState.no)
                        stationList.departureTrack = element.Route.Line.DepartureState.no;
                        stationList.arrivalTrack = element.Route.Line.ArrivalState.no;
                        stationList.numberOfStops = element.Route.Line.stopStationCount;
                        stationList.rideTime = element.Route.timeOnBoard;

                        //param.stationListParam.push(JSON.parse(JSON.stringify(stationList)));
                        commit('searchFare', stationList)


                    }
                    stationList.cnt++;

                }, );
                //console.log(JSON.stringify(param.stationListParam[1]) + "fare")

            }.bind(this))
            .catch(function(error) {
                //エラーをキャッチした時。
                console.log(error);
            })
            .finally(function() {
                //ファイナリーです。
            });

    },

}
export default {
    state,
    mutations,
    actions
}