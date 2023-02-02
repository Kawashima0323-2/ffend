import axios from 'axios'

const state = {
    length: 0,
    middleArea: [],
    smallArea: [],
    genre: [],
    shopsList: [],
};
const mutations = {
    middleArea(state, middleArea) {
        state.middleArea.push(JSON.parse(JSON.stringify(middleArea)));
    },
    middleArea0(state) {
        state.middleArea = [];
    },
    genre(state, genres) {
        state.genre.push(JSON.parse(JSON.stringify(genres)));
        console.log(state.genre)
    },
    genre0(state) {
        state.genre = [];
    },
    shopsList(state, shops) {
        state.shopsList.push(JSON.parse(JSON.stringify(shops)));

        console.log(shops)
        state.length = ++state.length
        console.log(state.length + "length")
    },
    shopsList0(state) {
        state.shopsList = [];
    },
};
const actions = {

    async middleArea({ commit }, { prefecture }) {
        const middleArea = {

        }
        commit("middleArea0")
        axios.get("/hotpepper/large_area/v1/?key=0d73d0b2914349e1&format=json&keyword=" + prefecture)
            .then(function(response) {
                axios.get("/hotpepper/middle_area/v1/?key=0d73d0b2914349e1&format=json&large_area=" + response.data.results.large_area[0].code)
                    .then(function(response) {
                        response.data.results.middle_area.forEach(middle_area => {
                            middleArea.middleAreaCode = middle_area.code
                            middleArea.middleAreaName = middle_area.name
                            commit("middleArea", middleArea)

                        })
                    }.bind(this))
                    .catch(function(error) {
                        //エラーをキャッチした時。
                        console.log(error);
                    })
                    .finally(function() {
                        //ファイナリーです。
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
    async genre({ commit }) {
        const genres = {}
        commit("genre0")
        axios.get("/hotpepper/genre/v1/?key=0d73d0b2914349e1&format=json")
            .then(function(response) {


                response.data.results.genre.forEach(genre => {
                    genres.genreCode = genre.code
                    genres.genreName = genre.name
                    commit("genre", genres)

                })
            }.bind(this))
            .catch(function(error) {
                //エラーをキャッチした時。
                console.log(error);
            })
            .finally(function() {
                //ファイナリーです。
            });
    },
    async searchShop({ commit }, { middleAreaCode, genreCode }) {
        const param = {
            middleAreaCode: middleAreaCode,
            genreCode: genreCode,
            cnt: 0,
        }
        commit("genre0")
        const shops = {};
        console.log("hot")
        axios.get("/hotpepper/gourmet/v1/?key=0d73d0b2914349e1&format=json&middle_area=" + param.middleAreaCode + "&genre=" + param.genreCode)
            .then(function(response) {
                console.log("hothot")
                    /*
                    欲しい情報リスト
                    response.data.results.shop.forEach(shop => {
                    console.log(shop)
                    })
                    shop.~で情報を取る

                    店舗名
                    shop.name = shop.name

                    住所
                    shops.address= shop.address

                    店舗ロゴ
                    shops.logo = shop.photo.pc.l

                    url
                    shops.url = shop.urls.pc

                    営業時間
                    shops.open = shop.open

                    定休日
                    shops.close = shop.close

                    ジャンル
                    shops.genre.name = shop.genre

                    ジャンルキャッチ
                    shops.genre.catch = shop.genre.catch

                    キャッチ
                    shops.catch = shop.catch

                    平均ディナー予算
                    shops.budget.average = shop.budget.average

                    料金備考
                    shops.budget_memo = shop.budget_memo

                    交通アクセス
                    shops.access = shop.access
                    

                     */
                response.data.results.shop.forEach(shop => {
                    console.log(shop)
                    shops.cnt = param.cnt++
                        shops.name = shop.name
                    shops.address = shop.address
                    shops.logo = shop.photo.pc.m
                    shops.url = shop.urls.pc
                    shops.open = shop.open
                    shops.close = shop.close
                    shops.genreName = shop.genre
                    shops.genreCatch = shop.genre.catch
                    shops.catch = shop.catch
                    shops.budgetAverage = shop.budget.average
                    shops.budgetMemo = shop.budget_memo
                    shops.access = shop.access
                    commit("shopsList", shops)




                })
            }.bind(this))
            .catch(function(error) {
                //エラーをキャッチした時。
                console.log(error);
            })
            .finally(function() {
                //ファイナリーです。
            });
    },
    length({ commit }) {
        commit("length")
    }
};
const methods = {
    undefinedCheck: function(no) {
        var track = ""
        if (typeof no === "undefined") {
            track = "データなし"
        } else {
            track = no + "番線"
        }
        return track
    },
};

export default {
    state,
    mutations,
    actions,
    methods,
}