import {defineStore} from "pinia";


export const useErrorStore = defineStore("error", {
    state: () => ({
        error: "",
        errors: {}
    }),
    getters: {
        hasError: (state) => state.error !== "",
        hasErrors: (state) => Object.values(state.errors).some(arr => arr.length > 0)
    },
    actions: {
        setError(error) {
            this.error = error
        },
        setErrors(errors) {
            this.errors = errors
        },
        hasKey(key){
            return this.errors.hasOwnProperty(key)
        },
        getError(key) {
            return this.errors[key]
        },
        clearError() {
            this.error = ""
        },
        clearErrors() {
            this.errors = {}
        },
        clearAll() {
            this.clearError()
            this.clearErrors()
        }
    }
})