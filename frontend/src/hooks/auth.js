import {computed} from 'vue'
import {useStore} from "vuex";

export function useAuth() {
    const store = useStore();
    const isAuthenticated = computed(() => {
        return store.getters["auth/isAuthenticated"]
    })
    return {
        isAuthenticated: isAuthenticated
    }
}