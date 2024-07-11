import {computed} from 'vue'
import {useStore} from "vuex";

export function useUser() {
    const store = useStore();
    const user = computed(() => {
        return store.getters["user/user"];
    })
    const currentPage = computed(() => {
        return store.getters["user/currentPage"];
    })

    return {
        user: user,
        currentPage: currentPage
    }
}