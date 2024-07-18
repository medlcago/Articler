import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {POST_LIMIT, POST_PROFILE_LIMIT} from "@/config.js";
import {createPost, deletePost, getPost, getPosts} from "@/services/post.js";
import {useRoute, useRouter} from "vue-router";
import {useErrorStore} from "@/store/errorStore.js";

export const usePostStore = defineStore("post", () => {
    const router = useRouter()
    const route = useRoute()
    const errorStore = useErrorStore()

    const currentPage = ref(1)
    const offset = ref(0)
    const limit = POST_LIMIT
    const profileLimit = POST_PROFILE_LIMIT
    const loading = ref(true)

    const posts = ref({})
    const post = ref({})
    const totalRecords = computed(() => posts.value.count)

    const fetchPost = async () => {
        loading.value = true
        const postId = route.params.id
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

    const sharePost = async (postTitle, postDescription, isPublished) => {
        const {data, status} = await createPost(postTitle, postDescription, isPublished);
        if (status === 201) {
            errorStore.errors = {}
            loading.value = true
            currentPage.value = 1
            offset.value = 0
            await fetchPosts()
        } else {
            errorStore.errors = data
        }
        return status
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
        errorStore.error = status === 204 ? "Пост успешно удален" : "Не удалось удалить пост"
        return status
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
        removePost,
        changePageAndFetchPosts,
        sharePost,
        fetchUserPosts,
    }

})