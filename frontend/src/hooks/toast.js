import {useToast as Toast} from "vue-toast-notification";
import {useMessageStore} from "@/store/messageStore.js";
import {useErrorStore} from "@/store/errorStore.js";
import {onBeforeUnmount, watch} from "vue";

export const useToast = (options = {}) => {
    const messageStore = useMessageStore()
    const errorStore = useErrorStore()

    const globalProps = Object.assign({}, {
        position: "top-right",
        duration: 1500,
        pauseOnHover: false,
        onDismiss: () => {
            messageStore.clearMessage()
            errorStore.clearError()
        }
    }, options)

    const toast = Toast(globalProps)

    onBeforeUnmount(() => {
        errorStore.$reset()
        messageStore.$reset()
    })

    watch(() => [errorStore.error, messageStore.message], ([error, message]) => {
        if (error) {
            toast.error(error)
        }
        if (message) {
            toast.success(message)
        }
    })

    return toast
}