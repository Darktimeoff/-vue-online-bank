import axios from 'axios';
import { error } from '@/utils/error';
const TOKEN_KEY = 'jwt-token';

export const authModule = {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY),
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        isAuthenticated(_, getters) {
            return Boolean(getters.token)
        },
    },
    actions: {
        async login({commit, dispatch}, user) {
            try {
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
                const { data: { idToken } } =  await axios.post(url, {
                    ...user, 
                    returnSecureToken: true,
                });
                commit('setToken', idToken);
                commit('clearMessage', null, {root: true});
            } catch (err) {
                console.log(err.response.data.error)
                const message = error(err.response.data.error.message);
                dispatch('actionSetMessage', {
                    value: message,
                    type: 'danger',
                }, {root: true});
                throw new Error()
            }
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem(TOKEN_KEY, token);
        },
        logout(state) {
            state.token = null;
            localStorage.removeItem(TOKEN_KEY);
        },
    }
}