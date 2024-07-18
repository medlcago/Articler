import {defineStore} from 'pinia'
import {ref} from "vue";

export const usePageStore = defineStore("page", () => {
    const currentPage = ref({})

    const setCurrentPage = async (page) => {
        currentPage.value = page
    }

    return {
        currentPage,
        setCurrentPage
    }
})