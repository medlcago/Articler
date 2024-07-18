import {defineStore} from "pinia";


export const useErrorStore = defineStore("error", {
    state: () => ({
        error: "",
        errors: {}
    })
})