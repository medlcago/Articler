import {defineStore} from 'pinia'
import {ref} from "vue";
import {changeUserData, getUser, registerUser, resetPassword, resetPasswordConfirm} from "@/services/user.js";
import {loginUser, logoutUser, refreshAccessToken, verifyAccessToken} from "@/services/auth.js";
import {useRouter} from "vue-router";
import {useErrorStore} from "@/store/errorStore.js";
import {useMessageStore} from "@/store/messageStore.js";

export const useUserStore = defineStore("user", () => {
    const router = useRouter()
    const errorStore = useErrorStore()
    const messageStore = useMessageStore()

    const currentUser = ref({})
    const isLoggedIn = ref(false)

    const loading = ref(false)
    const editProfile = ref(false)

    const login = async (email, password) => {
        loading.value = true
        const user = await loginUser(email, password);
        loading.value = false
        if (user) {
            messageStore.setMessage("Вы успешно вошли в систему")
            await router.replace("/profile")
        } else {
            errorStore.setError("Неверный email или пароль")
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
            errorStore.clearAll()
            await login(email, password)
        } else {
            errorStore.setErrors(data)
        }
    }

    const logout = async () => {
        await logoutUser()
        messageStore.setMessage("Вы успешно вышли из системы")
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
        return currentUser
    }
    const updateUserData = async (data) => {
        editProfile.value = true
        const {data: result, status} = await changeUserData(currentUser.value.id, data)
        editProfile.value = false
        if (status === 200) {
            messageStore.setMessage("Данные успешно обновлены")
            currentUser.value = result
        } else {
            errorStore.setError("Не удалось обновить данные")
        }
    }

    const resetUserPassword = async (email) => {
        const {status} = await resetPassword(email)
        if (status === 200) {
            messageStore.setMessage("Письмо отправлено на вашу почту")
        } else if (status === 400) {
            errorStore.setError("Адрес не найден в системе")
        } else {
            errorStore.setError("Произошла ошибка при смене пароля")
        }
    }

    const changeUserPassword = async (token, password) => {
        const {status} = await resetPasswordConfirm(token, password)
        if (status === 200) {
            messageStore.setMessage("Пароль успешно изменен")
        } else {
            errorStore.setError("Произошла ошибка.\nВозможно, время действия токена истекло")
        }
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
        editProfile,
        updateUserData,
        changeUserPassword
    }
})