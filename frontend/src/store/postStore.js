import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {POST_LIMIT, POST_PROFILE_LIMIT} from "@/config.js";
import {createPost, deletePost, getPost, getPosts} from "@/services/post.js";
import {useRouter} from "vue-router";
import {useErrorStore} from "@/store/errorStore.js";
import {useMessageStore} from "@/store/messageStore.js";

export const usePostStore = defineStore("post", () => {
    const router = useRouter()
    const errorStore = useErrorStore()
    const messageStore = useMessageStore()

    const currentPage = ref(1)
    const offset = ref(0)
    const limit = POST_LIMIT
    const profileLimit = POST_PROFILE_LIMIT
    const loading = ref(true)

    const posts = ref([])
    const post = ref({})
    const totalRecords = computed(() => posts.value.count)

    const fetchPost = async (postId) => {
        loading.value = true
        const data = await getPost(postId)
        if (data) {
            post.value = data
        } else {
            await router.replace({name: "notFound"})
        }
        loading.value = false
    }

    const fetchPosts = async () => {
        loading.value = true
        posts.value = await getPosts({
            limit: limit,
            offset: offset.value,
        })
        loading.value = false
    }

    const fetchUserPosts = async (userId) => {
        loading.value = true
        posts.value = await getPosts({
            limit: profileLimit,
            author__id: userId,
        })
        loading.value = false
    }

    const sharePost = async (data) => {
        const {data: result, status} = await createPost(data);
        if (status === 201) {
            messageStore.setMessage("Пост успешно создан")
            errorStore.clearAll()
            loading.value = true
            currentPage.value = 1
            offset.value = 0
            await fetchPosts()
        } else {
            errorStore.setErrors(result)
            messageStore.clearMessage()
        }
    }

    const changePageAndFetchPosts = async (page) => {
        loading.value = true;
        offset.value = (page - 1) * limit
        currentPage.value = page
        await fetchPosts()
        if (posts.value.results.length === 0 && currentPage.value > 1) {
            loading.value = true;
            currentPage.value--
            offset.value = (currentPage.value - 1) * limit
            await fetchPosts()
        }
    }

    const removePost = async (postId) => {
        const {status} = await deletePost(postId)
        if (status === 204) {
            messageStore.setMessage("Пост успешно удален")
        } else {
            errorStore.setError("Не удалось удалить пост")
        }
    }

    const deletePostFromDetail = async (postId) => {
        await removePost(postId)
        if (!errorStore.hasError) {
            await router.replace({name: "main"})
        }
    }

    const deletePostFromList = async (postId) => {
        await removePost(postId)
        if (!errorStore.hasError) {
            await changePageAndFetchPosts(currentPage.value);
        }
    }

    return {
        post,
        posts,
        totalRecords,
        currentPage,
        offset,
        limit,
        loading,
        fetchPost,
        fetchPosts,
        deletePostFromDetail,
        deletePostFromList,
        changePageAndFetchPosts,
        sharePost,
        fetchUserPosts,
    }

})