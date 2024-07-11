import {getUser} from "@/services/user.js";

export default {
    namespaced: true,
    state() {
        return {
            user: {},
            currentPage: "login"
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        currentPage(state) {
            return state.currentPage
        }
    },
    mutations: {
        SET_USER(state, payload) {
            state.user = payload
        },
        SET_CURRENT_PAGE(state, payload) {
            state.currentPage = payload
        }

    },
    actions: {
        async currentUser({commit}) {
            const user = await getUser()
            commit("SET_USER", user)
        },
        async currentPage({commit}, payload) {
            commit("SET_CURRENT_PAGE", payload)
        }
    }
}