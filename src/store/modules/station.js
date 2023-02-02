import axios from 'axios'

const state = {
    cnt: 0,
    from: "", //出発駅
    to: "", //到着駅
    stationListFrom: [],
    stationListTo: [],
    station: {},
    stationListParam: [],
    lineList: []
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

    },
    stationListParam(state) {
        state.stationListParam = [];
    },
    cnt(state, param) {

        state.station = state.stationListParam[param.cnt]
        state.lineList = state.station.line
        console.log(state.station)
        console.log(state.lineList)
    }
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
    async searchFare({ commit }) {
        const stationList = {
            cnt: 0,
            from: "",
            to: "",
            fare: 0,
            totalRideTime: 0,
            transferCount: 0,
            arrivalTime: "",
            departureTime: "",
            line: [],
            prices: 0
        };
        const line = {
            cnt: 0,
            from: "",
            to: "",
            lineDistance: "",
            numberOfStops: "",
            arrivalTime: "",
            arrivalTrack: "",
            departureTime: "",
            departureTrack: "",
            rideTime: "",
            lineColor: "",
            lineName: "",
            totalPrice: "",
            price: [],
        };

        //axios.get("https://api.ekispert.jp/v1/json/search/course/extreme?key=test_LJYtHBhahBd&time=1924&viaList=" + param.from + ":" + param.to)
        axios.get("https://api.ekispert.jp/v1/json/search/course/extreme?key=test_LJYtHBhahBd&time=1924&viaList=千葉:東京")
            .then(function(response) {
                //通信に成功した時の処理fdfdfss
                commit('stationListParam')
                    //responseの中に返ってきたオブジェクトが入ってる。
                    //片道運賃


                console.log(response.data.ResultSet.Course.length)
                console.log(Array.isArray(response.data.ResultSet.Course) + "response.data.ResultSet.Course")



                /*
                ほしい経路検索情報
                出発駅 from
                到着駅 to


                Price 運賃
                通常料金  if (element.Price[].Type == "Fare") (element.Type == "Fare") element.Price.Oneway
                その他料金 自由席 Free .指定席 Reserved ,グリーン Green switch(element.Type)で分ける element.Price.Oneway

                Route 区間
                乗車時間合計 element.Route.timeOnBoard
                その他時間合計 乗換待ち時間etc...  element.Route.timeOther
                乗換回数合計  element.Route.transferCount
                経路の距離 element.Route.distance
                経路の徒歩時間合計 element.Route.timeWalk

                Line 区間
                Array.isArray(element.Route.Line)
                true 配列 乗換あり
                    forEach(element で回しながら取得
                    element.～
                false オブジェクト 乗り換えなし
                     element.Route.Line.～
                    下に書くものはelement.Route.Line.～にする
                区間の距離  element.Route.Line.distance
                列車が停止する駅の数 element.Route.Line.stopStationCount
                到着番線 element.Route.Line.ArrivalState.no
                到着時間  methods.time(element.Route.Line.ArrivalState.Datetime.text)
                路線カラー element.Route.Line.Color
                出発番線 element.Route.Line.DepartureState.no
                出発時間  methods.time(element.Route.Line.DepartureState.Datetime.text)


                Point 駅情報
                駅名称
                */

                response.data.ResultSet.Course.forEach(element => {

                    /*
                    Array.isArray(element.Route.Line)
                    true 配列 乗換あり
                    false オブジェクト 乗り換えなし
                    */
                    var Line = element.Route.Line
                    console.log(Line.distance + "dssssssssss")
                    if (Array.isArray(element.Route.Line)) {
                        console.log("true")
                        element.Route.Line.forEach(Line => {
                            line.from = element.Route.Point[line.cnt].Station.Name
                            line.to = element.Route.Point[line.cnt + 1].Station.Name
                            line.lineDistance = Number(Line.distance) / 10 + "km"
                            line.numberOfStops = Number(Line.stopStationCount) + 1 + "駅"
                            line.arrivalTime = methods.time(Line.ArrivalState.Datetime.text)
                            line.arrivalTrack = methods.undefinedCheck(Line.ArrivalState.no)
                            line.departureTime = methods.time(Line.DepartureState.Datetime.text)
                            line.departureTrack = methods.undefinedCheck(Line.DepartureState.no)
                            line.lineColor = Line.Color
                            line.rideTime = Line.timeOnBoard + "分"
                            line.lineName = Line.Name

                            element.Price.forEach(price => {
                                if (!(typeof price.toLineIndex === "undefined") && (price.toLineIndex == line.cnt + 1) &&
                                    (price.kind == "Fare" || price.kind == "Charge" || price.kind == "Reserved" || price.kind == "NoneReserved" || price.kind == "Free")) {
                                    line.price.push(JSON.parse(JSON.stringify(methods.priceParams(price))));
                                    if (price.selected == "true") {
                                        console.log(price.Oneway)
                                        console.log(stationList.prices)
                                        stationList.prices = Number(price.Oneway) + stationList.prices
                                        console.log(stationList.prices + "prices")
                                    }
                                }

                            })
                            line.totalPrice = stationList.prices + "円"
                            stationList.line.push(JSON.parse(JSON.stringify(line)));
                            console.log(JSON.stringify(stationList.line) + "line")
                            console.log(JSON.stringify(stationList) + "stationList")
                            line.totalPrice = []
                            stationList.prices = 0
                            line.cnt++;

                        })
                    } else {
                        console.log("false")
                        line.from = element.Route.Point[line.cnt].Station.Name
                        line.to = element.Route.Point[line.cnt + 1].Station.Name
                        line.lineDistance = Number(element.Route.Line.distance) / 10 + "km"
                        line.numberOfStops = Number(element.Route.Line.stopStationCount) + 1 + "駅"
                        line.arrivalTime = methods.time(element.Route.Line.ArrivalState.Datetime.text)
                        line.arrivalTrack = methods.undefinedCheck(element.Route.Line.ArrivalState.no)
                        line.departureTime = methods.time(element.Route.Line.DepartureState.Datetime.text)
                        line.departureTrack = methods.undefinedCheck(element.Route.Line.DepartureState.no)
                        line.lineColor = element.Route.Line.Color
                        line.rideTime = element.Route.Line.timeOnBoard + "分"
                        line.lineName = element.Route.Line.Name


                        element.Price.forEach(price => {
                            if (!(typeof price.toLineIndex === "undefined") && (price.toLineIndex == line.cnt + 1) &&
                                (price.kind == "Fare" || price.kind == "Charge" || price.kind == "Reserved" || price.kind == "NoneReserved" || price.kind == "Free")) {
                                line.price.push(JSON.parse(JSON.stringify(methods.priceParams(price))));
                                if (price.selected == "true") {
                                    console.log(price.Oneway)
                                    console.log(stationList.prices)
                                    stationList.prices = Number(price.Oneway) + stationList.prices
                                    console.log(stationList.prices + "prices")
                                }
                            }

                        })
                        line.totalPrice = stationList.prices + "円"
                        stationList.line.push(JSON.parse(JSON.stringify(line)));
                        console.log(JSON.stringify(stationList.line) + "line")
                        line.totalPrice = []
                        stationList.prices = 0
                    }

                    stationList.fare = 0

                    element.Price.forEach(price => {
                        if (price.kind == "ChargeSummary") {
                            console.log(price.Oneway + "Oneway")
                            stationList.fare = Number(price.Oneway)
                        }
                        if (price.kind == "FareSummary") {
                            console.log(stationList.fare + "fare")
                            console.log(price.Oneway + "Oneway")
                            stationList.fare = Number(price.Oneway) + Number(stationList.fare)
                        }
                    })
                    console.log(stationList.line + "line")
                    console.log(JSON.stringify(stationList.line.length) + "line.length")
                    console.log(stationList.line[0].arrivalTime + "time")
                    console.log(stationList.line[JSON.stringify(stationList.line.length) - 1].departureTime + "time")
                    stationList.arrivalTime = stationList.line[JSON.stringify(stationList.line.length) - 1].arrivalTime
                    stationList.departureTime = stationList.line[0].departureTime

                    stationList.from = element.Route.Point[0].Station.Name
                    stationList.to = element.Route.Point[element.Route.Point.length - 1].Station.Name

                    console.log(element.Route.timeOnBoard + "totalRideTime")
                    console.log(element.Route.timeOther + "totalRideTime")
                    console.log(stationList.cnt)
                    if (typeof no === "undefined")
                        stationList.transferCount = element.Route.transferCount;
                    stationList.totalRideTime = Number(element.Route.timeOnBoard) + Number(element.Route.timeOther);
                    console.log(JSON.stringify(stationList) + "stationList")
                    commit('searchFare', stationList)
                    line.cnt = 0
                    line.totalPrice = []
                    line.price = []
                    stationList.line = []
                    stationList.prices = 0
                    stationList.cnt++;

                }, );

            }.bind(this))
            .catch(function(error) {
                //エ)ラーをキャッチした時。
                console.log(error);
            })
            .finally(function() {
                //ファイナリーです。
            });


    },
    async cnt({ commit }, { cnt }) {
        const param = {
            cnt: cnt
        }
        commit("cnt", param)
    }


}
const methods = {
    time: function(a) {
        var beginIdx = a.indexOf("T");
        var endIdx = a.indexOf(":");
        var result = a.substring(beginIdx + 1, endIdx + 3);
        return result
    },
    undefinedCheck: function(no) {
        var track = ""
        if (typeof no === "undefined") {
            track = "データなし"
        } else {
            track = no + "番線"
        }
        return track
    },
    lineparams: function() {

    },
    priceParams: function(price) {
        var priceParams = {}
        switch (price.Type) {
            case "Free":
                priceParams.Oneway = price.Oneway
                priceParams.Name = "自由席"
                break;
            case "Green":
                priceParams.Oneway = price.Oneway
                priceParams.Name = "グリーン"
                break;
            case "Reserved":
                priceParams.Oneway = price.Oneway
                priceParams.Name = "指定席"
                break;
        }
        console.log(priceParams + "price")
        return priceParams
    }
}
export default {
    state,
    mutations,
    actions,
    methods,
}