import axios from '@/axios/request';

export const requestsModule =  { 
    namespaced: true,
    state() {
        return {
            requests: [],
        }
    },
    getters: {
        requests(state) {
            return state.requests;
        },
    },
    mutations: {
        setRequests(state, requests) {
            state.requests = requests;
        },
        addRequest(state, request) {
            state.requests.push(request)
        },
        deleteRequest(state, id) {
            state.requests = state.requests.filter(request => request.id !== id);
        },
    },
    actions: {
        async actionCreateRequest({rootGetters, dispatch, commit}, payload) {
            try {
                const token = rootGetters['auth/token'];
                const {data} = await axios.post(`/requests.json?auth=${token}`, payload);

                commit('addRequest', {...payload, id: data.name});

                dispatch('actionSetMessage', {
                    value: 'Заявка успешно создана',
                    type: 'primary',
                }, {root: true})
            } catch (e) {
                dispatch('actionSetMessage', {
                    value: e.message,
                    type: 'danger',
                }, {root: true})
            }
        },
        async actionLoadRequest({ commit, dispatch, rootGetters }) {
            try {
                const token = rootGetters['auth/token'];
                const {data} = await axios.get(`/requests.json?auth=${token}`);
                const requests = Object.keys(data).map(key => ({...data[key], id: key}))
                commit('setRequests', requests);
            } catch (e) {
                dispatch('actionSetMessage', {
                    value: e.message,
                    type: 'danger',
                }, {root: true})
            }
        },
        async actionLoadById({ dispatch, rootGetters }, id) {
            try {
                const token = rootGetters['auth/token'];

                const {data} = await axios.get(`/requests/${id}.json?auth=${token}`);

                return data;
            } catch (e) {
                dispatch('actionSetMessage', {
                    value: e.message,
                    type: 'danger',
                }, {root: true})
            }
        },
        async actionDeleteRequest({ commit, dispatch, rootGetters }, id) {
            try {
                const token = rootGetters['auth/token'];

                await axios.delete(`/requests/${id}.json?auth=${token}`);
                
                commit('deleteRequest', id)
            } catch (e) {
                dispatch('actionSetMessage', {
                    value: e.message,
                    type: 'danger',
                }, {root: true})
            }
        },
        async actionUpdateRequest({ dispatch, rootGetters}, updateInf) {
            try {
                const token = rootGetters['auth/token'];

                await axios.patch(`/requests/${updateInf.id}.json?auth=${token}`, {
                    status: updateInf.status,
                });
            } catch (e) {
                dispatch('actionSetMessage', {
                    value: e.message,
                    type: 'danger',
                }, {root: true})
            }
        }
    }
}