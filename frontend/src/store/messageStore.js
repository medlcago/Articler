import {defineStore} from "pinia";

export const useMessageStore = defineStore("message", {
    state: () => ({
        message: ""
    }),
    getters: {
        hasMessage: (state) => state.message !== "",
    },
    actions: {
        setMessage(message) {
            this.message = message;
        },
        clearMessage() {
            this.message = "";
        }
    }
})