import {defineStore} from 'pinia'
import {ref} from "vue";
import {changeUserData, getUser, registerUser, resetPassword, resetPasswordConfirm} from "@/services/user.js";
import {loginUser, logoutUser, refreshAccessToken, verifyAccessToken} from "@/services/auth.js";
import {useRouter} from "vue-router";
import {useErrorStore} from "@/store/errorStore.js";

export const useUserStore = defineStore("user", () => {
    const router = useRouter()
    const errorStore = useErrorStore()

    const currentUser = ref({})
    const isLoggedIn = ref(false)

    const loading = ref(false)

    const login = async (email, password) => {
        loading.value = true
        const user = await loginUser(email, password);
        loading.value = false
        if (user) {
            errorStore.error = ""
            await router.replace("/profile")
        } else {
            errorStore.error = "Неверный email или пароль";
        }

    }

    const register = async (email, password) => {
        loading.value = true
        const {data, status} = await registerUser(
            email,
            password
        )
        loading.value = false
        if (status === 201) {
            errorStore.errors = {}
            await login(email, password)
        } else {
            errorStore.error = data
        }
    }

    const logout = async () => {
        await logoutUser()
        await router.replace({
            name: "login"
        })
    }

    const checkAuth = async () => {
        let result = await verifyAccessToken()
        if (!result) {
            result = await refreshAccessToken()
        }
        isLoggedIn.value = result
        return result
    }

    const fetchCurrentUser = async () => {
        currentUser.value = await getUser()
    }
    const updateUserData = async (data) => {
        const {data: errors, status} = await changeUserData(currentUser.value.id, data)
        if (status !== 200) {
            errorStore.errors = errors
        }
        return status
    }

    const resetUserPassword = async (email) => {
        const {status} = await resetPassword(email)
        errorStore.error = status === 200 ? "Письмо для восстановления пароля отправлено на указанный вами адрес электронной почты" : "Адрес не найден в системе";
        return status
    }

    const changeUserPassword = async (token, password) => {
        const {status} = await resetPasswordConfirm(token, password)
        if (status !== 200) {
            errorStore.error = "Произошла ошибка при смене пароля"
        }
        return status
    }

    return {
        checkAuth,
        fetchCurrentUser,
        resetUserPassword,
        currentUser,
        isLoggedIn,
        login,
        logout,
        register,
        loading,
        updateUserData,
        changeUserPassword
    }
})