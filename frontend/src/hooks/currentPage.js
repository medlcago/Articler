import {useRouter} from "vue-router";

export const useCurrentPage = () => {
    const router = useRouter();
    const currentRoute = router.currentRoute.value
    return {
        longName: currentRoute.meta.longName,
        shortName: currentRoute.meta.shortName,
        name: currentRoute.name
    }
}