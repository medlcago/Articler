import {refreshAccessToken, verifyAccessToken} from "@/services/auth.js";

export default {
    namespaced: true,
    state() {
        return {
            isAuthenticated: false
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.isAuthenticated
        }
    },
    mutations: {
        SET_IS_AUTHENTICATED(state, payload) {
            state.isAuthenticated = payload
        }

    },
    actions: {
        async checkAuth({commit}) {
            let result = await verifyAccessToken()
            if (!result){
                result = await refreshAccessToken()
            }
            commit("SET_IS_AUTHENTICATED", result)
            return result
        }
    }
}