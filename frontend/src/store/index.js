import {createStore} from "vuex";
import auth from "./auth.js";
import user from "@/store/user.js";

const store = createStore({
        modules: {auth, user}
    }
);

export default store;